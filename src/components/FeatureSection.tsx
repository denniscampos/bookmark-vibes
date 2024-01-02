import { ClipboardCheck, Globe, Tags } from 'lucide-react';

const featureSectionData = [
  {
    title: 'Effortless Organization',
    description: 'Paste Twitter links to effortlessly organize.',
    icon: <ClipboardCheck className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Access Anytime',
    description: 'Access your curated tweet collection anytime.',
    icon: <Globe className="w-4 h-4 text-primary" />,
  },
  {
    title: 'Personalized Categorization',
    description: 'Customize categories for your unique interests.',
    icon: <Tags className="w-4 h-4 text-primary" />,
  },
];

export function FeatureSection() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg sm:text-2xl font-bold text-center">
        Save and Categorize with a click
      </h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {featureSectionData.map((featureSection, index) => (
          <div
            key={`feature-${index}`}
            className="border p-4 w-[300px] space-y-4"
          >
            <div className="flex items-center gap-2">
              {featureSection.icon}
              <h3 className="font-semibold">{featureSection.title}</h3>
            </div>
            <p className="text-muted-foreground">
              {featureSection.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
