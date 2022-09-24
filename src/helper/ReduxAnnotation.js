class ReduxAnnotation{
    constructor()
    {
        if(!ReduxAnnotation.Instance) {
            
            this.data ={}
            this.set = (uniqueId, key, value) => {
                if(!Array.isArray(key)){
                    this.data[uniqueId+''+key] = value
                }else {
                    key.forEach(i=>{
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
            
            ReduxAnnotation.Instance = this;
            
        }
    }
}
const Instance = new ReduxAnnotation()

module.exports = Instance