export const searchSlice = (terjemahan, words) => {
    var n = terjemahan.search(words);
    var wordsLength = words.length;
    var lengthExcerpt = 40;
    
    var result;
    
    if (terjemahan.length < lengthExcerpt){
      	result = terjemahan;
    }
    else {
        var charForOther = lengthExcerpt - wordsLength;
        var wordBetween = charForOther / 2;
   
    	if ( (terjemahan.length - n) < lengthExcerpt )
        {
        	var startFrom = terjemahan.length - lengthExcerpt;
        	result = terjemahan.slice(startFrom, lengthExcerpt);
        }
        else {
            var startFrom = n - wordBetween;
            var endIn = n + wordBetween + wordsLength;

            result = terjemahan.slice(startFrom, endIn);
        }

    }

    return result;
}