#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Sharandeep Portfolio
Tests all backend endpoints with realistic data and scenarios
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend/.env
BACKEND_URL = "https://aidevsharans.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Portfolio-API-Tester/1.0'
        })
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("=== TESTING HEALTH ENDPOINTS ===")
        
        # Test root endpoint
        try:
            response = self.session.get(f"{BACKEND_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "Sharandeep Portfolio API" in data.get("message", ""):
                    self.log_test("GET /api/ - Root endpoint", True, 
                                f"Status: {response.status_code}, Message: {data.get('message')}")
                else:
                    self.log_test("GET /api/ - Root endpoint", False, 
                                f"Unexpected response format", data)
            else:
                self.log_test("GET /api/ - Root endpoint", False, 
                            f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/ - Root endpoint", False, f"Exception: {str(e)}")

        # Test health endpoint
        try:
            response = self.session.get(f"{BACKEND_URL}/health")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("GET /api/health - Health check", True, 
                                f"Status: healthy, Database: {data.get('database')}")
                else:
                    self.log_test("GET /api/health - Health check", False, 
                                f"Status not healthy", data)
            else:
                self.log_test("GET /api/health - Health check", False, 
                            f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/health - Health check", False, f"Exception: {str(e)}")

    def test_ai_chatbot(self):
        """Test AI chatbot endpoints with different message types"""
        print("=== TESTING AI CHATBOT API ===")
        
        test_messages = [
            {
                "message": "Tell me about Sharandeep's experience",
                "expected_keywords": ["AWS", "Afame", "Data Scientist", "AI Engineer", "intern"]
            },
            {
                "message": "What are his technical skills?",
                "expected_keywords": ["Python", "Machine Learning", "TensorFlow", "React", "AI"]
            },
            {
                "message": "How can I contact him?",
                "expected_keywords": ["email", "phone", "LinkedIn", "sharanreddy.adla", "716"]
            }
        ]
        
        session_id = str(uuid.uuid4())
        
        for i, test_case in enumerate(test_messages):
            try:
                payload = {
                    "message": test_case["message"],
                    "session_id": session_id
                }
                
                response = self.session.post(f"{BACKEND_URL}/chat", json=payload)
                
                if response.status_code == 200:
                    data = response.json()
                    reply = data.get("reply", "").lower()
                    
                    # Check if response contains expected keywords
                    keywords_found = [kw for kw in test_case["expected_keywords"] 
                                    if kw.lower() in reply]
                    
                    if keywords_found:
                        self.log_test(f"POST /api/chat - Message {i+1}", True, 
                                    f"Found keywords: {keywords_found}, Session: {data.get('session_id')}")
                    else:
                        self.log_test(f"POST /api/chat - Message {i+1}", False, 
                                    f"No expected keywords found in response", 
                                    {"reply": data.get("reply")[:200] + "..."})
                else:
                    self.log_test(f"POST /api/chat - Message {i+1}", False, 
                                f"Status code: {response.status_code}", response.text)
                    
            except Exception as e:
                self.log_test(f"POST /api/chat - Message {i+1}", False, f"Exception: {str(e)}")

    def test_contact_form(self):
        """Test contact form API"""
        print("=== TESTING CONTACT FORM API ===")
        
        contact_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Interested in AI/ML collaboration",
            "message": "Hi Sharandeep, I'm interested in discussing potential AI/ML opportunities. Your experience at AWS and Afame Technologies is impressive!"
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/contact", json=contact_data)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "successfully" in data.get("message", "").lower():
                    self.log_test("POST /api/contact - Contact form", True, 
                                f"Message: {data.get('message')}")
                else:
                    self.log_test("POST /api/contact - Contact form", False, 
                                f"Unexpected response format", data)
            else:
                self.log_test("POST /api/contact - Contact form", False, 
                            f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("POST /api/contact - Contact form", False, f"Exception: {str(e)}")

        # Test invalid email format
        try:
            invalid_contact = contact_data.copy()
            invalid_contact["email"] = "invalid-email"
            
            response = self.session.post(f"{BACKEND_URL}/contact", json=invalid_contact)
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("POST /api/contact - Invalid email validation", True, 
                            "Correctly rejected invalid email format")
            else:
                self.log_test("POST /api/contact - Invalid email validation", False, 
                            f"Should have returned 422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("POST /api/contact - Invalid email validation", False, f"Exception: {str(e)}")

    def test_resume_download(self):
        """Test resume PDF download"""
        print("=== TESTING RESUME DOWNLOAD ===")
        
        try:
            response = self.session.get(f"{BACKEND_URL}/resume/download")
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                content_disposition = response.headers.get('content-disposition', '')
                
                if 'application/pdf' in content_type:
                    if 'Sharandeep_Reddy_Resume.pdf' in content_disposition:
                        pdf_size = len(response.content)
                        self.log_test("GET /api/resume/download - PDF generation", True, 
                                    f"PDF generated successfully, Size: {pdf_size} bytes")
                    else:
                        self.log_test("GET /api/resume/download - PDF generation", False, 
                                    f"Incorrect filename in headers", 
                                    {"content_disposition": content_disposition})
                else:
                    self.log_test("GET /api/resume/download - PDF generation", False, 
                                f"Incorrect content type: {content_type}")
            else:
                self.log_test("GET /api/resume/download - PDF generation", False, 
                            f"Status code: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("GET /api/resume/download - PDF generation", False, f"Exception: {str(e)}")

    def test_analytics_api(self):
        """Test analytics tracking API"""
        print("=== TESTING ANALYTICS API ===")
        
        analytics_events = [
            {
                "event": "page_view",
                "data": {"page": "home", "user_agent": "test-browser"},
                "session_id": str(uuid.uuid4())
            },
            {
                "event": "button_click",
                "data": {"button": "contact", "section": "hero"},
                "session_id": str(uuid.uuid4())
            },
            {
                "event": "resume_view",
                "data": {"format": "pdf", "source": "portfolio"}
            }
        ]
        
        for i, event_data in enumerate(analytics_events):
            try:
                response = self.session.post(f"{BACKEND_URL}/analytics/track", json=event_data)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and "tracked" in data.get("message", "").lower():
                        self.log_test(f"POST /api/analytics/track - Event {i+1}", True, 
                                    f"Event '{event_data['event']}' tracked successfully")
                    else:
                        self.log_test(f"POST /api/analytics/track - Event {i+1}", False, 
                                    f"Unexpected response format", data)
                else:
                    self.log_test(f"POST /api/analytics/track - Event {i+1}", False, 
                                f"Status code: {response.status_code}", response.text)
                    
            except Exception as e:
                self.log_test(f"POST /api/analytics/track - Event {i+1}", False, f"Exception: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("=== TESTING ERROR HANDLING ===")
        
        # Test invalid endpoint
        try:
            response = self.session.get(f"{BACKEND_URL}/nonexistent")
            if response.status_code == 404:
                self.log_test("GET /api/nonexistent - 404 handling", True, 
                            "Correctly returned 404 for invalid endpoint")
            else:
                self.log_test("GET /api/nonexistent - 404 handling", False, 
                            f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/nonexistent - 404 handling", False, f"Exception: {str(e)}")

        # Test malformed JSON
        try:
            response = self.session.post(f"{BACKEND_URL}/chat", 
                                       data="invalid json", 
                                       headers={'Content-Type': 'application/json'})
            if response.status_code == 422:
                self.log_test("POST /api/chat - Malformed JSON", True, 
                            "Correctly rejected malformed JSON")
            else:
                self.log_test("POST /api/chat - Malformed JSON", False, 
                            f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/chat - Malformed JSON", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        """Run all test suites"""
        print(f"Starting comprehensive backend API testing...")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print("=" * 60)
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_ai_chatbot()
        self.test_contact_form()
        self.test_resume_download()
        self.test_analytics_api()
        self.test_error_handling()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"❌ {result['test']}: {result['details']}")
        
        print(f"\nTest completed at: {datetime.now().isoformat()}")
        
        return passed_tests, failed_tests

if __name__ == "__main__":
    tester = PortfolioAPITester()
    passed, failed = tester.run_all_tests()
    
    # Exit with error code if tests failed
    sys.exit(0 if failed == 0 else 1)