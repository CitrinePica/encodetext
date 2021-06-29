var encodeAfter = new Array()  
let inputText = document.getElementById('inputText') 
let input_keyEncode = document.getElementById('input_keyEncode') 
let input_keyEncodeVinegene = document.getElementById('input_keyEncodeVinegene')
const textInput= ['a', 'b', 'c', 'd', 'e','f', 'g', 'h' ,'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y','z','1','2','3','4','5','6','7','8','9','0']
const onlyTextVietNam = ['a', 'b', 'c', 'd', 'e','f', 'g', 'h' ,'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y','z']
const onlyTextEnglish = ['a', 'b', 'c', 'd', 'e','f', 'g', 'h' ,'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y','z']
const encodeMorse= ['.-','_...','_._.','_..','.','.','.._.','__.','....','..','.___','_._','._..','__','_.','___','.__.','__._','._.','...','_','.._','..._','.__','_.._','_.__','__..','.____','..___','...__','...._','.....','_....','__...','___..','____.','_____']
const encodeNumber = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']
const encodePhone = ['21','22','23','31','32','33','41','42','43','51','52','53','61','62','63','71','72','73','74','81','82','83','91','92','93','94','14','26','36','44','54','66','75','85','95','000']
let encodeAtbash = onlyTextVietNam.slice().reverse();
let encodeCaesar = onlyTextVietNam.concat(onlyTextVietNam.splice(0,3)) ;
let encodeCoordinates=''
let encodeCoordinatesRender = ''
window.onload = function()
{   
    localStorage.clear();
    localStorage.setItem('method','encodeMorse')
};
/*-----------------CAESER---------------------*/
function encriptCaesar() {
    const onlyTextEnglish = ['a', 'b', 'c', 'd', 'e','f', 'g', 'h' ,'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y','z']
    var keyCaesar = (parseInt(input_keyEncode.value)) 
        if(keyCaesar>26) {keyCaesar%=26}
        encodeCaesar = onlyTextEnglish.concat(onlyTextEnglish.splice(0,keyCaesar))
        showEncode() 
}
/*-----------------END-CAESER---------------------*/
/*------------------VIGENERE--------------------*/   
function keyEncodeVigene(str,key){
    key=key.split("");
   if(str.length == key.length)
       return key.join("");
   else {
       let temp=key.length;   
       for (let i = 0;i<(str.length-temp) ; i++){
           key.push(key[i % ((key).length)])
       }
   }
   return key.join("");
} 
function input_Text_Vigene(str,key){
   let cipher_text_Vigene=""; 
   for (let i = 0; i < str.length; i++){ 
       let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26; 
       x += 'a'.charCodeAt(0); 
       cipher_text_Vigene+=String.fromCharCode(x);
   }
   return cipher_text_Vigene;
}  
function encriptVigenere() {   
    let key = keyEncodeVigene(inputText.value.toUpperCase(),input_keyEncodeVinegene.value.toUpperCase()); 
    let cipher_text_Vigene = input_Text_Vigene(inputText.value.toUpperCase(), key);
    //console.log("input_Text_Vigene : " + cipher_text_Vigene );  
    localStorage.setItem('encriptVigenere',cipher_text_Vigene)
    showEncode()
}
/*------------------END-VIGENERE--------------------*/ 
/*------------------COORDINATES-----------------------------*/ 
function encriptCoordinates() {
    for(var i = 0; i < $("#inputText").val().length;i++) {
        var encodeCoordinates = (textInput.indexOf($("#inputText").val()[i])+1) % 5  
        if(encodeCoordinates != 0) {
            var x_Coordinates = encodeCoordinates;
            var y_Coordinates =  Math.floor((textInput.indexOf($("#inputText").val()[i])+1) / 5)+1
        } 
        else {
            var x_Coordinates = 5;
            var y_Coordinates = (textInput.indexOf($("#inputText").val()[i])+1) / 5
        } 
        encodeCoordinatesRender=encodeCoordinatesRender.concat('('+x_Coordinates+','+y_Coordinates+')')
        console.log('(',x_Coordinates,',',y_Coordinates,')') 
        console.log('encodeCoordinatesRender',encodeCoordinatesRender) 
    }   
        localStorage.setItem('encriptCoordinates',encodeCoordinatesRender)
    encodeCoordinatesRender=''
}

/*------------------END-COORDINATES--------------------*/ 
$(document).ready(function() {
    $(".option").click(function () {
        $(".option").removeClass("active-option");
        $(this).addClass("active-option");   
        if(this.value ==='Caesar') {
            document.getElementById('keyEncode').style.display='block'
            document.getElementById('input_keyEncodeVinegene').style.display='none'
            document.getElementById('input_keyEncode').value= '3'
            $("#input_keyEncode").on("input", function(){  
                encriptCaesar()
            });
        } 
         if(this.value ==='Vigenere') {
            document.getElementById('input_keyEncode').style.display='none'
            document.getElementById('keyEncode').style.display='block'
            document.getElementById('input_keyEncodeVinegene').style.display='block'
            document.getElementById('input_keyEncodeVinegene').value= 'huyhoang'
            $("#input_keyEncodeVinegene").on("input", function(){    
                    encriptVigenere()
                    showEncode() 
            });
        } 
         if(this.value ==='Coordinates') {
            document.getElementById('keyEncode').style.display='block'
            document.getElementById('input_keyEncode').style.display='block'
            document.getElementById('input_keyEncode').value= '5'
            document.getElementById('input_keyEncodeVinegene').style.display='none'
            $("#input_keyEncode").on("input", function(){    
                    encriptCoordinates()
                    showEncode() 
            });
        } 
         if(this.value ==='Atbash' || this.value ==='Morse' || this.value==='Phone') {
            document.getElementById('keyEncode').style.display='none'
        } 
    });   
}); 
//----------------------------------------------//
function showEncode() {
    if(localStorage.getItem('method') == 'encriptVigenere') {
        document.getElementById('encodeText').innerHTML = localStorage.getItem('encriptVigenere')
    }
    else if(localStorage.getItem('method') == 'encodeCoordinates') {
        document.getElementById('encodeText').innerHTML = localStorage.getItem('encriptCoordinates')
    }
    else {
        for(var i = 0; i < $("#inputText").val().length;i++) {
            if(textInput.indexOf($("#inputText").val()[i])!=-1) {  
                encodeAfter.push(eval(localStorage.getItem('method'))[textInput.indexOf($("#inputText").val()[i])]+' ')
            }
            else {  
                encodeAfter.push('   ')
            } 
        }
        $("#encodeText").text(encodeAfter.join('')); 
    }
    encodeAfter=[]
}
function loadEncode() {
    $("#inputText").on("input", function(){  
        encriptVigenere()
        encriptCoordinates()
        showEncode()
    });
} 
function reloadEncode() { 
    showEncode()
}
$(document).ready(function() {loadEncode()});
function chooseMethod(param) { 
    localStorage.setItem('method',param) 
    loadEncode()
    reloadEncode()
}
encodeAfter=[] 
function copyEncode() { 
    var copyText = document.getElementById("encodeText"); 
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    document.execCommand("copy"); 
    alert("Copied the text: " + copyText.value);
}