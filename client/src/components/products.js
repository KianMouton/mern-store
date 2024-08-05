const mockProducts = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'image1.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'image2.jpg'
    }
]

const Products = () => {

    return (
        <div className='products'>
            <h1>Products</h1>
            {mockProducts.map((product) => {
                return (
                    <div key={product.id} className='product'>
                        <img src={`/images/${product.image}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Products;