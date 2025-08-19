
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Package, ArrowUpDown, Star, TrendingUp } from 'lucide-react';

const mockUserItems = [
  {
    id: '1',
    title: 'Blue Cotton T-Shirt',
    status: 'available',
    points: 15,
    views: 23,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=150&h=150'
  },
  {
    id: '2',
    title: 'Black Jeans',
    status: 'swapped',
    points: 25,
    views: 45,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=150&h=150'
  }
];

const mockSwaps = [
  {
    id: '1',
    type: 'outgoing',
    itemTitle: 'Summer Dress',
    otherUser: 'Emma K.',
    status: 'pending',
    date: '2024-01-15'
  },
  {
    id: '2',
    type: 'incoming',
    itemTitle: 'Designer Jacket',
    otherUser: 'Mike D.',
    status: 'completed',
    date: '2024-01-10'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBrowseItems = () => {
    navigate('/items');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Manage your items and track your swapping activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Balance</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.points}</div>
            <p className="text-xs text-muted-foreground">+20 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Listed</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Swaps</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="flex items-center gap-2">
              <Link to="/add-item">
                <Plus className="w-4 h-4" />
                List New Item
              </Link>
            </Button>
            <Button type="button" variant="outline" onClick={handleBrowseItems}>
              Browse Items
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Content */}
      <Tabs defaultValue="items" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">My Items</TabsTrigger>
          <TabsTrigger value="swaps">Swap Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Items</CardTitle>
              <CardDescription>Manage the items you've listed for swap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={item.status === 'available' ? 'default' : 'secondary'}>
                            {item.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.points} points • {item.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/item/${item.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Swaps</CardTitle>
              <CardDescription>Track your incoming and outgoing swap requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSwaps.map((swap) => (
                  <div key={swap.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{swap.itemTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        {swap.type === 'outgoing' ? 'Swap request to' : 'Swap request from'} {swap.otherUser}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{swap.date}</p>
                    </div>
                    <Badge variant={swap.status === 'completed' ? 'default' : 'secondary'}>
                      {swap.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
