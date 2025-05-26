import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WoxxerFanRating from "@/components/rating/WoxxerFanRating";
//export default function FanRating() {
//  return <WoxxerFanRating />;
//}

// Sample data for other users' ratings
const sampleRatings = [
  { x: 25, y: 75, color: '#BE185D' },
  { x: 38, y: 65, color: '#3B82F6' },
  { x: 32, y: 70, color: '#10B981' },
  { x: 45, y: 82, color: '#8B5CF6' },
  { x: 58, y: 68, color: '#F97316' },
  { x: 70, y: 60, color: '#EF4444' },
  { x: 65, y: 45, color: '#6366F1' },
  { x: 80, y: 35, color: '#A855F7' },
  { x: 20, y: 30, color: '#EC4899' },
  { x: 35, y: 20, color: '#14B8A6' },
];

const FanRatingPage: React.FC = () => {
  const [userRatings, setUserRatings] = useState<Array<{ x: number; y: number; color?: string }>>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const handleRatingsSubmit = (ratings: Array<{ x: number; y: number; color?: string }>) => {
    setUserRatings(ratings);
    setHasSubmitted(true);
    console.log('Submitted ratings:', ratings);
  };
  
  // Get descriptions for each rating
  const getRatingDescription = (rating: { x: number; y: number }) => {
    let marketDesc = rating.x < 50 ? 
      'Growing market with positive expansion potential' : 
      'Shrinking market with potential contraction';
      
    if (rating.x < 30) marketDesc += ' (Strong growth indicators)';
    else if (rating.x > 70) marketDesc += ' (Significant market decline)';
    
    let competitionDesc = rating.y > 50 ? 
      'Less crowded space with fewer direct competitors' : 
      'Crowded market with many established competitors';
      
    if (rating.y > 70) competitionDesc += ' (Blue ocean opportunity)';
    else if (rating.y < 30) competitionDesc += ' (Extremely saturated market)';
    
    let overallDesc = '';
    if (rating.x < 50 && rating.y > 50) {
      overallDesc = 'High potential opportunity (growing market with less competition)';
    } else if (rating.x < 50 && rating.y < 50) {
      overallDesc = 'Challenging but promising (growing market despite competition)';
    } else if (rating.x > 50 && rating.y > 50) {
      overallDesc = 'Niche opportunity (declining market but with less competition)';
    } else {
      overallDesc = 'High risk venture (shrinking market with heavy competition)';
    }
    
    return {
      market: marketDesc,
      competition: competitionDesc,
      overall: overallDesc
    };
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Header title="Woxxer Rating" />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Interactive Rating</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Provide multiple ratings to show how different perspectives view this market opportunity
        </p>
      </div>
      
      <WoxxerFanRating 
        question="What do you think of the Market this company is addressing?"
        xAxis={{
          id: 'market-growth',
          name: 'Market Growth',
          leftLabel: 'Growing market',
          rightLabel: 'Shrinking market'
        }}
        yAxis={{
          id: 'competition',
          name: 'Competition',
          leftLabel: 'Crowded space',
          rightLabel: 'Blue ocean'
        }}
        onSubmitRatings={handleRatingsSubmit}
        showOtherRatings={hasSubmitted}
        otherRatings={sampleRatings}
        maxRatings={3}
      />
      
      {hasSubmitted && userRatings.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Ratings Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Based on your {userRatings.length} different ratings, you've provided these perspectives on the market:
            </p>
            
            {userRatings.map((rating, index) => {
              const desc = getRatingDescription(rating);
              return (
                <div key={index} className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: rating.color }}
                    ></div>
                    Perspective {index + 1}
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Market Growth:</strong> {desc.market}
                    </li>
                    <li>
                      <strong>Competition:</strong> {desc.competition}
                    </li>
                    <li>
                      <strong>Overall Assessment:</strong> {desc.overall}
                    </li>
                  </ul>
                </div>
              );
            })}
            
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {sampleRatings.length} other users have also provided ratings for this market evaluation.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FanRatingPage;