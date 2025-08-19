import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, Grid, List } from 'lucide-react';
import ItemCard from '@/components/items/ItemCard';

// Extended mock data with more items
const allItems = [
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
  },
  {
    id: '4',
    title: 'Classic White T-Shirt',
    category: 'Tops',
    size: 'L',
    condition: 'Excellent',
    points: 15,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=300',
    uploader: 'Alex R.'
  },
  {
    id: '5',
    title: 'High-Waisted Jeans',
    category: 'Bottoms',
    size: '28',
    condition: 'Good',
    points: 35,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&h=300',
    uploader: 'Jessica L.'
  },
  {
    id: '6',
    title: 'Leather Crossbody Bag',
    category: 'Accessories',
    size: 'One Size',
    condition: 'Excellent',
    points: 45,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&h=300',
    uploader: 'Maria S.'
  },
  {
    id: '7',
    title: 'Yoga Pants',
    category: 'Activewear',
    size: 'M',
    condition: 'Good',
    points: 20,
    image: 'https://images.unsplash.com/photo-1506629904890-03c399ff6bca?auto=format&fit=crop&w=300&h=300',
    uploader: 'Taylor B.'
  },
  {
    id: '8',
    title: 'Silk Blouse',
    category: 'Tops',
    size: 'S',
    condition: 'Excellent',
    points: 28,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&h=300',
    uploader: 'Sophie W.'
  },
  {
    id: '9',
    title: 'Winter Coat',
    category: 'Outerwear',
    size: 'L',
    condition: 'Good',
    points: 50,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=300&h=300',
    uploader: 'David K.'
  }
];

const categories = [
  'All Categories',
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Shoes',
  'Accessories',
  'Activewear',
  'Sleepwear'
];

const AllItems = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse All Items</h1>
            <p className="text-xl text-gray-600">
              Discover unique pieces from our community of sustainable fashion enthusiasts
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search items..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="All Categories">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {allItems.length} items
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllItems; 