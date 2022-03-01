module.exports =  {
    getLastParam: function (){
        const url = window.location.pathname.split("/");

        return parseInt(url.pop());
    }
}