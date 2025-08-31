import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Package, BarChart3 } from 'lucide-react';
import { User, Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import ProductForm from './ProductForm';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [currentView, setCurrentView] = useState<'overview' | 'products' | 'add-product' | 'edit-product'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setCurrentView('edit-product');
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }
    setCurrentView('products');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-white">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-gold" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Stock</p>
              <p className="text-3xl font-bold text-white">
                {products.filter(p => p.inStock).length}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Featured</p>
              <p className="text-3xl font-bold text-white">
                {products.filter(p => p.featured).length}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-gold" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setCurrentView('products')}
          className="bg-gray-800 hover:bg-gray-700 rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105"
        >
          <Package className="w-12 h-12 text-gold mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Manage Products</h3>
          <p className="text-gray-400">Add, edit, and remove products from your catalog</p>
        </button>
        
        <button
          onClick={() => setCurrentView('add-product')}
          className="bg-gray-800 hover:bg-gray-700 rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-12 h-12 text-gold mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Add New Product</h3>
          <p className="text-gray-400">Create a new product listing</p>
        </button>
      </div>
    </div>
  );

  const renderProductsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Product Management</h2>
        <button
          onClick={() => setCurrentView('add-product')}
          className="bg-gold text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No Products Yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first product to the catalog</p>
          <button
            onClick={() => setCurrentView('add-product')}
            className="bg-gold text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-all duration-300"
          >
            Add First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-xl p-6 flex items-center space-x-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className="text-gray-400 mb-2">{product.category.toUpperCase()}</p>
                <div className="flex items-center space-x-2">
                  {product.isPromo && product.originalPrice ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-red-400 font-bold text-lg">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-gold font-bold text-lg">${product.price.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`text-sm font-medium ${
                    product.inStock ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="text-sm text-gray-400">
                    {product.reviews?.length || 0} review{product.reviews?.length !== 1 ? 's' : ''}
                  </span>
                  {product.isPromo && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      PROMO
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-gold text-black px-2 py-1 rounded text-xs font-bold">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="p-2 text-gray-400 hover:text-gold transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gold">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Welcome, {user.firstName}</span>
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <span className="sr-only">Logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 px-6 py-4">
        <div className="flex space-x-6">
          <button
            onClick={() => setCurrentView('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'overview' 
                ? 'bg-gold text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentView('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'products' 
                ? 'bg-gold text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Products
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {currentView === 'overview' && renderOverview()}
        {currentView === 'products' && renderProductsList()}
        {(currentView === 'add-product' || currentView === 'edit-product') && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setCurrentView('products');
              setEditingProduct(null);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;