// Code to hide ddress bar 
// window.addEventListener("load",function() {
//     setTimeout(function(){
//         // This hides the address bar:
//         window.scrollTo(0, 1);
//     }, 0);
// });





const onClickMenu = () => {
    document.getElementById("menu").classList.toggle('change');

    // Get the Nav-item Elemnt
    document.getElementById("navItem").classList.toggle('change');

    //Get the bg
    document.getElementById("menu-bg").classList.toggle('change-bg');

} //Function for Toggle NavBar

const TypeWriter = function (txtElement, words, wait = 1000){
    this.txtElement  = txtElement;
    this.words = words;
    this.wait = wait;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}//Initialization of variables.

//Type Method
TypeWriter.prototype.type = function(){
    //get current index of word
    const currentTxt = this.wordIndex % this.words.length;

    //show the full text
    const fullTxt = this.words[currentTxt];
    
    //check ifDeleting
    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length -  1)
    }else{
        this.txt = fullTxt.substring(0, this.txt.length +  1)
    }
    //insert txt into elemnt
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //initial Type speed
    let typeSpeed = 300;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    //If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make pause at end
        typeSpeed = this.wait;
        //set delete to true
        this.isDeleting = true;

    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //move to next index
        this.wordIndex++;
        //pause before typing
        typeSpeed = 500;

    }

   setTimeout(() => this.type(), typeSpeed) 
   
}

//Init on Dom Load
document.addEventListener('DOMContentLoaded', init);

//init function
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //init TypeWriter
    new TypeWriter(txtElement, words, wait);
}