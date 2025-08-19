
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, ArrowUpDown, Star, User, MapPin, Calendar, Tag } from 'lucide-react';

// Mock data - replace with actual API call
const mockItem = {
  id: '1',
  title: 'Vintage Denim Jacket',
  description: 'Beautiful vintage denim jacket from the 90s. Barely worn, excellent condition. Perfect for layering or as a statement piece. Has some unique distressing that gives it character.',
  category: 'Outerwear',
  size: 'M',
  condition: 'Good',
  points: 25,
  images: [
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?auto=format&fit=crop&w=600&h=600',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&h=600'
  ],
  tags: ['vintage', 'denim', 'casual', '90s'],
  uploader: {
    name: 'Sarah M.',
    avatar: '',
    rating: 4.8,
    totalSwaps: 23,
    location: 'San Francisco'
  },
  uploadDate: '2024-01-10',
  views: 45,
  interested: 8
};

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleSwapRequest = () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to request swaps.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Swap request sent!',
      description: 'Your swap request has been sent to Sarah M. They will be notified.'
    });
  };

  const handlePointsRedeem = () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to redeem items.',
        variant: 'destructive'
      });
      return;
    }

    if (user.points < mockItem.points) {
      toast({
        title: 'Insufficient points',
        description: `You need ${mockItem.points} points to redeem this item. You currently have ${user.points} points.`,
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Item redeemed!',
      description: `You've successfully redeemed this item for ${mockItem.points} points.`
    });
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? 'Removed from favorites' : 'Added to favorites',
      description: isLiked ? 'Item removed from your favorites.' : 'Item added to your favorites.'
    });
  };

  const handleViewProfile = () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to view profiles.',
        variant: 'destructive'
      });
      return;
    }
    // Navigate to profile page (you can implement this later)
    toast({
      title: 'Profile view',
      description: 'Profile view functionality coming soon!'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={mockItem.images[currentImageIndex]} 
              alt={mockItem.title}
              className="w-full h-full object-cover"
            />
          </div>
          {mockItem.images.length > 1 && (
            <div className="flex gap-2">
              {mockItem.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mockItem.title}</h1>
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Star className="w-5 h-5 fill-current" />
                  {mockItem.points} points
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLike}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{mockItem.category}</Badge>
              <Badge variant="outline">Size {mockItem.size}</Badge>
              <Badge variant="outline">{mockItem.condition}</Badge>
            </div>

            <p className="text-gray-600 leading-relaxed">{mockItem.description}</p>
          </div>

          {/* Tags */}
          {mockItem.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockItem.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleSwapRequest} className="w-full" size="lg">
              <ArrowUpDown className="w-5 h-5 mr-2" />
              Request Swap
            </Button>
            <Button 
              onClick={handlePointsRedeem} 
              variant="outline" 
              className="w-full" 
              size="lg"
              disabled={user && user.points < mockItem.points}
            >
              <Star className="w-5 h-5 mr-2" />
              Redeem for {mockItem.points} Points
              {user && user.points < mockItem.points && (
                <span className="ml-2 text-red-500">({mockItem.points - user.points} more needed)</span>
              )}
            </Button>
          </div>

          {/* Item Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold text-lg">{mockItem.views}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{mockItem.interested}</div>
                  <div className="text-sm text-muted-foreground">Interested</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">3</div>
                  <div className="text-sm text-muted-foreground">Days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Uploader Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Listed by</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback>
                  {mockItem.uploader.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{mockItem.uploader.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    {mockItem.uploader.rating} rating
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="w-4 h-4" />
                    {mockItem.uploader.totalSwaps} swaps
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {mockItem.uploader.location}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={handleViewProfile}>View Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemDetail;
