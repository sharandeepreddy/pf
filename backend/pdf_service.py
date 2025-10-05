from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from io import BytesIO
from datetime import datetime

class PDFService:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._create_custom_styles()
        
    def _create_custom_styles(self):
        """Create custom styles for the resume"""
        # Header style
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Title'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#1e40af')
        ))
        
        # Section header style
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading1'],
            fontSize=16,
            spaceAfter=12,
            spaceBefore=20,
            textColor=colors.HexColor('#374151'),
            borderWidth=1,
            borderColor=colors.HexColor('#e5e7eb'),
            borderPadding=5
        ))
        
        # Subsection style
        self.styles.add(ParagraphStyle(
            name='SubSection',
            parent=self.styles['Heading2'],
            fontSize=12,
            spaceAfter=6,
            spaceBefore=8,
            textColor=colors.HexColor('#1f2937'),
            leftIndent=20
        ))
        
        # Contact info style
        self.styles.add(ParagraphStyle(
            name='ContactInfo',
            parent=self.styles['Normal'],
            fontSize=11,
            alignment=TA_CENTER,
            spaceAfter=20
        ))
    
    def generate_resume_pdf(self) -> BytesIO:
        """Generate Sharandeep's resume as PDF"""
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=72, leftMargin=72,
                               topMargin=72, bottomMargin=18)
        
        # Build the resume content
        story = []
        
        # Header
        story.append(Paragraph("Adla Sharandeep Reddy", self.styles['CustomTitle']))
        story.append(Paragraph(
            "AI/ML Engineer & Data Scientist<br/>" +
            "Buffalo, NY, USA | +1 (716) 750-9326<br/>" +
            "sharanreddy.adla@gmail.com | sharande@buffalo.edu<br/>" +
            "<a href='https://www.linkedin.com/in/sharandeep-reddy'>LinkedIn</a> | " +
            "<a href='https://github.com/sharan-555/'>GitHub</a>",
            self.styles['ContactInfo']
        ))
        
        story.append(Spacer(1, 12))
        
        # Professional Summary
        story.append(Paragraph("Professional Summary", self.styles['SectionHeader']))
        story.append(Paragraph(
            "Passionate AI/ML Engineer with expertise in deep learning, NLP, and predictive modeling. " +
            "Currently pursuing Master's in Data Science at University at Buffalo with hands-on " +
            "experience at AWS and Afame Technologies. Proven track record of improving model " +
            "accuracy by 20% and optimizing inference speed by 30%.",
            self.styles['Normal']
        ))
        
        # Education
        story.append(Paragraph("Education", self.styles['SectionHeader']))
        
        story.append(Paragraph("Master's in Data Science (MPS)", self.styles['SubSection']))
        story.append(Paragraph(
            "University at Buffalo, NY, USA | Aug 2024 – Present | GPA: 3.704",
            self.styles['Normal']
        ))
        
        story.append(Paragraph("B.Tech in Electronics and Computer Engineering", self.styles['SubSection']))
        story.append(Paragraph(
            "Sreenidhi Institute of Science and Technology, Hyderabad | 2020 – 2024 | CGPA: 8.3",
            self.styles['Normal']
        ))
        
        # Experience
        story.append(Paragraph("Professional Experience", self.styles['SectionHeader']))
        
        story.append(Paragraph("Data Scientist Intern | Afame Technologies", self.styles['SubSection']))
        story.append(Paragraph("Jan 2024 – Mar 2024", self.styles['Normal']))
        story.append(Paragraph(
            "• Improved ML model accuracy by 20% through advanced feature engineering<br/>" +
            "• Optimized inference speed by 30% using efficient algorithms<br/>" +
            "• Applied hyperparameter tuning and enhanced big data scalability<br/>" +
            "• Collaborated with cross-functional teams on production deployments",
            self.styles['Normal']
        ))
        
        story.append(Spacer(1, 8))
        
        story.append(Paragraph("AI Engineer Intern | Amazon Web Services (AWS)", self.styles['SubSection']))
        story.append(Paragraph("Dec 2022 – Feb 2023", self.styles['Normal']))
        story.append(Paragraph(
            "• Built and fine-tuned NLP models using Hugging Face transformers<br/>" +
            "• Integrated OpenAI API for enhanced functionality and user experience<br/>" +
            "• Deployed AI workflows in cloud environment with scalability focus<br/>" +
            "• Collaborated with cross-functional teams on enterprise solutions",
            self.styles['Normal']
        ))
        
        # Projects
        story.append(Paragraph("Key Projects", self.styles['SectionHeader']))
        
        story.append(Paragraph("Heart Disease Prediction Using ML & XAI", self.styles['SubSection']))
        story.append(Paragraph(
            "• Published at ICOTET 2024 conference<br/>" +
            "• Developed explainable AI model for medical diagnosis<br/>" +
            "• Technologies: Python, Scikit-learn, XAI, Pandas, Matplotlib",
            self.styles['Normal']
        ))
        
        story.append(Paragraph("Handwritten Digit & Facial Recognition", self.styles['SubSection']))
        story.append(Paragraph(
            "• CNN achieved 98% accuracy, outperforming DNN by 12%<br/>" +
            "• Comparative analysis of deep learning architectures<br/>" +
            "• Technologies: TensorFlow, Keras, OpenCV, CNN, DNN",
            self.styles['Normal']
        ))
        
        story.append(Paragraph("SQL-Based Swimmer Club Management System", self.styles['SubSection']))
        story.append(Paragraph(
            "• Managed 500+ members and 100+ inventory items<br/>" +
            "• Implemented normalized SQL schema and efficient queries<br/>" +
            "• Technologies: SQL, DBMS, Python, Streamlit, PostgreSQL",
            self.styles['Normal']
        ))
        
        # Technical Skills
        story.append(Paragraph("Technical Skills", self.styles['SectionHeader']))
        
        # Create skills table
        skills_data = [
            ['Languages:', 'Python, SQL, JavaScript, HTML/CSS'],
            ['AI/ML:', 'Scikit-learn, TensorFlow, Keras, Transformers, NLP, XAI'],
            ['Frameworks:', 'React.js, FastAPI, Streamlit, Gradio'],
            ['Databases:', 'PostgreSQL, MongoDB, MySQL'],
            ['Cloud/Deploy:', 'AWS, GitHub, Netlify, Heroku, Hugging Face'],
            ['Visualization:', 'Matplotlib, Seaborn, Plotly, D3.js']
        ]
        
        skills_table = Table(skills_data, colWidths=[1.2*inch, 4*inch])
        skills_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, colors.HexColor('#f9fafb')]),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb'))
        ]))
        story.append(skills_table)
        
        # Certifications
        story.append(Paragraph("Certifications", self.styles['SectionHeader']))
        story.append(Paragraph(
            "• Cognizant AI Virtual Experience (2023)<br/>" +
            "• Microsoft AI Skills Challenge (2023)<br/>" +
            "• IBM ML with Python Level 1 (2022)",
            self.styles['Normal']
        ))
        
        # Footer
        story.append(Spacer(1, 20))
        story.append(Paragraph(
            f"Generated on {datetime.now().strftime('%B %d, %Y')} | " +
            "Latest version available at portfolio website",
            self.styles['Normal']
        ))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer
