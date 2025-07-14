const categories = ["Electronics", "Grocery", "Clothing", "Accessories"];
export const categorySet = new Set(categories); 
export const productsMap = new Map();

const generateMockProducts = (count = 1000) => {
    
  
    const getRandomCategory = () => {
      const items = Array.from(categorySet);
      return items[Math.floor(Math.random() * items.length)];
    };
  
    const getRandomName = (id) => `Product-${id}`;
  
    const getRandomPrice = () =>
      parseFloat((Math.random() * 1000 + 10).toFixed(2)); // Between 10 and 1010
  
    const getRandomStock = () => Math.floor(Math.random() * 1000); // Between 0 and 999
  
    const getRandomStatus = () => (Math.random() > 0.2 ? "Active" : "Inactive");
  

  
    for (let i = 1; i <= count; i++) {
      const product = {
        id: i,
        name: getRandomName(i),
        category: getRandomCategory(),
        price: getRandomPrice(),
        stock: getRandomStock(),
        status: getRandomStatus(),
      };
      productsMap.set(i, product);
    }
  
    return Array.from(productsMap.values());
  };

export default generateMockProducts;