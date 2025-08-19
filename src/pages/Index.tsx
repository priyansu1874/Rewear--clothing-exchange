
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Recycle, Users, Award, Heart } from 'lucide-react';
import ItemCard from '@/components/items/ItemCard';
import { useAuth } from '@/contexts/AuthContext';

const featuredItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    category: 'Outerwear',
    size: 'M',
    condition: 'Good',
    points: 25,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?auto=format&fit=crop&w=300&h=300',
    uploader: 'Sarah M.'
  },
  {
    id: '2',
    title: 'Summer Floral Dress',
    category: 'Dresses',
    size: 'S',
    condition: 'Excellent',
    points: 30,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&h=300',
    uploader: 'Emma K.'
  },
  {
    id: '3',
    title: 'Designer Sneakers',
    category: 'Shoes',
    size: '9',
    condition: 'Good',
    points: 40,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&h=300',
    uploader: 'Mike D.'
  }
];

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBrowseItems = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      navigate('/items');
    } else {
      navigate('/login');
    }
  };

  const handleViewAllItems = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      navigate('/items');
    } else {
      navigate('/login');
    }
  };

  const handleStartSwapping = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Give Your Clothes a Second Life
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Join the sustainable fashion revolution. Exchange unused clothing with others in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button type="button" size="lg" onClick={handleStartSwapping} className="text-lg px-8 py-6">
                Start Swapping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={handleBrowseItems} className="text-lg px-8 py-6">
                Browse Items
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ReWear Works</h2>
            <p className="text-xl text-gray-600">Simple, sustainable, and rewarding</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>List Your Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Upload photos and details of clothes you no longer wear. Earn points for each approved item.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Recycle className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Browse & Swap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Discover unique pieces from others. Request direct swaps or use your points to claim items.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Earn & Redeem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Build your points balance as others claim your items. Use points to get clothes you love.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section id="featured" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Items</h2>
            <p className="text-xl text-gray-600">Discover unique pieces ready for their next adventure</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button type="button" size="lg" onClick={handleViewAllItems}>
              View All Items
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference</h2>
            <p className="text-xl text-gray-600">Together, we're creating a more sustainable future</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1,250+</div>
              <div className="text-gray-600">Items Exchanged</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">2.5 tons</div>
              <div className="text-gray-600">Textile Waste Diverted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">15,000+</div>
              <div className="text-gray-600">Points Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto w-16 h-16 text-white mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the ReWear Community Today
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Start your sustainable fashion journey and connect with like-minded people who care about the planet.
          </p>
          <Button type="button" size="lg" variant="secondary" onClick={handleBrowseItems} className="text-lg px-8 py-6">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
