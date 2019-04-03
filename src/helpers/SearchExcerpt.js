export default searchExcerpt = (terjemahan, words) => {
    let lengthExcerpt = 85;
    let result;

    if (terjemahan.length < lengthExcerpt) result = terjemahan;
    else result = (terjemahan.slice(0, lengthExcerpt)) + '...';
    return result;
}