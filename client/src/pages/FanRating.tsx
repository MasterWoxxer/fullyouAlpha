import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WoxxerFanRating from '@/components/rating/WoxxerFanRating';

// Sample data for ratings
const sampleRatings = [
  { x: 25, y: 75 },
  { x: 38, y: 65 },
  { x: 32, y: 70 },
  { x: 45, y: 82 },
  { x: 58, y: 68 },
  { x: 70, y: 60 },
  { x: 65, y: 45 },
  { x: 80, y: 35 },
  { x: 20, y: 30 },
  { x: 35, y: 20 },
];

const FanRatingPage: React.FC = () => {
  const [userRating, setUserRating] = useState<{ x: number; y: number } | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const handleRatingSubmit = (rating: { x: number; y: number }) => {
    setUserRating(rating);
    setHasSubmitted(true);
    console.log('Submitted rating:', rating);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Header title="Woxxer Rating" />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Interactive Rating</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Rate and explore how others perceive market opportunities
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
        onSubmitRating={handleRatingSubmit}
        showOtherRatings={hasSubmitted}
        otherRatings={sampleRatings}
      />
      
      {hasSubmitted && userRating && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Rating Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Based on your rating, you see this market as:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Market Growth:</strong> {userRating.x < 50 ? 
                  'Growing market with positive expansion potential' : 
                  'Shrinking market with potential contraction'
                }
                {userRating.x < 30 ? ' (Strong growth indicators)' : 
                  userRating.x > 70 ? ' (Significant market decline)' : ''}
              </li>
              <li>
                <strong>Competition:</strong> {userRating.y > 50 ? 
                  'Less crowded space with fewer direct competitors' : 
                  'Crowded market with many established competitors'
                }
                {userRating.y > 70 ? ' (Blue ocean opportunity)' : 
                  userRating.y < 30 ? ' (Extremely saturated market)' : ''}
              </li>
              <li>
                <strong>Overall Assessment:</strong> {
                  userRating.x < 50 && userRating.y > 50 ? 
                    'High potential opportunity (growing market with less competition)' :
                  userRating.x < 50 && userRating.y < 50 ?
                    'Challenging but promising (growing market despite competition)' :
                  userRating.x > 50 && userRating.y > 50 ?
                    'Niche opportunity (declining market but with less competition)' :
                    'High risk venture (shrinking market with heavy competition)'
                }
              </li>
            </ul>
            
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {sampleRatings.length} other users have rated this market. Your assessment {
                userRating.x < 50 && userRating.y > 50 ? 
                  'aligns with the majority opinion' :
                userRating.x > 70 || userRating.y < 30 ?
                  'differs significantly from most other assessments' :
                  'falls within the typical range of assessments'
              }.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FanRatingPage;