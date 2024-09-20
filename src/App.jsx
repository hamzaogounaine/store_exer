import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart } from "lucide-react"
import { products } from "./Products"

function CartModal({ cart, removeFromCart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cart.length && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogDescription>Review your items before checkout</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <img src={item.image} width={100} alt="" />
                </div>
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-4">Proceed to Checkout</Button>
      </DialogContent>
    </Dialog>
  )
}

export default function ProductCatalog() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
  
      if (existingItem) {
        // If the product already exists in the cart, increase its quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If the product doesn't exist in the cart, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <CartModal cart={cart} removeFromCart={removeFromCart} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader>
              <img src={product.image} alt={product.name} />
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <Badge variant="secondary">Brand : {product.brand}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">${product.price}</span>
              <Button size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
