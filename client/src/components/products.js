const mockProducts = [
    {
        id: 1,
        name: 'Shirt',
        price: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'image1.jpg'
    },
    {
        id: 2,
        name: 'Hat',
        price: 200,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'image2.jpg'
    },
    {
        id: 3,
        name: 'Pants',
        price: 300,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'image3.jpg'
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
                        <p>R{product.price}</p>
                    </div>
                )
            })}
            <button className='load-more'>Load More</button>
        </div>
    )
}

export default Products;