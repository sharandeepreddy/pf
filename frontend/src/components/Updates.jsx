import React from 'react';
import { Megaphone, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Updates = () => {
  const updates = [
    {
      id: 3,
      date: "2024",
      title: "Research Publication — Heart Disease Prediction Using ML with XAI",
      description: "Published research paper at ICOTET 2024 in AIP Conference Proceedings on Heart disease prediction using Machine Learning with Explainable AI techniques (SHAP, LIME) for transparent ECG-based diagnosis.",
      type: "Publication",
      link: "https://pubs.aip.org/aip/acp/article-abstract/3297/1/060013/3369764/Heart-disease-prediction-using-ML-with-XAI?redirectedFrom=fulltext",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
    },
    {
      id: 2,
      date: "November 2025",
      title: "Mentoring — Hack-Nation Global AI Hackathon",
      description: "Excited to share that I'll be mentoring at Hack-Nation's Global AI Hackathon! I'll be guiding students from top universities and supporting impactful AI innovations at this global event sponsored by Google, OpenAI, and SAP.",
      type: "Mentoring",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700"
    },
    {
      id: 1,
      date: "November 2024",
      title: "Available for Full-Time Opportunities",
      description: "Actively seeking full-time AI/ML Engineer and Data Scientist roles. Graduating December 2025 with a Master's in Data Science from University at Buffalo.",
      type: "Career",
      badgeColor: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
    }
  ];

  return (
    <section id="updates" className="py-12 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Megaphone size={16} />
            Updates
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Latest News
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {updates.map((update) => (
            <Card 
              key={update.id}
              className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-700/50 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex-1">
                    {update.title}
                  </CardTitle>
                  <Badge 
                    variant="outline"
                    className={update.badgeColor}
                  >
                    {update.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <Calendar className="w-4 h-4" />
                  {update.date}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {update.description}
                </p>
                {update.link && (
                  <a
                    href={update.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    View Publication
                    <ExternalLink size={14} />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Updates;
