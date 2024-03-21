const formatPrice = (number?: number) => {
    return (number || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
};

export default formatPrice;