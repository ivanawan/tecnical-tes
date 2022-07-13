function changeArrayElement(array,fromIndex,toIndex){
    const element = array.splice(fromIndex, 1)[0];
    array.splice(toIndex, 0, element);
    return array;
}


function sortArray(array){
    changeArrayElement(array,1,0); 
    changeArrayElement(array,3,4);
    changeArrayElement(array,17,8);
    changeArrayElement(array,18,11);
    changeArrayElement(array,12,13);
    changeArrayElement(array,16,18);
    console.log(array.toString());
}


let array=['u', 'D', 'm', 'w', 'b', 'a', 'y','s', 'i', 's', 'w', 'a', 'e', 's', 'e', 'o', 'm',' ' , ' '];
sortArray(array);