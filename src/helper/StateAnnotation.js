class StateAnnotation{
    constructor()
    {
        if(!StateAnnotation.Instance) {
            
            this.data ={}
            this.set = (uniqueId, key, value) => {
                if(!Array.isArray(key)){

                    if(Object.keys(this.data).indexOf(key)!==-1){
                        delete this.data.uniqueId+''+key
                    }

                    this.data[uniqueId+''+key] = value

                }else {
                    key.forEach( i =>{
                        if(Object.keys(this.data).indexOf(i)!==-1){
                            delete this.data.uniqueId+''+i
                        }
                        this.data[uniqueId+''+i] = value
                    })
                }
            }
            this.get = (uniqueId, key) => {
                
                return this.data[uniqueId+''+key]
            }
            this.remove = (uniqueId, key)=>{
                
                delete this.data[uniqueId+''+key]
            }
            
            StateAnnotation.Instance = this;
            
        }
    }
}
const Instance = new StateAnnotation()

module.exports = Instance