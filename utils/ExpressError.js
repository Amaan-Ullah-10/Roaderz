class ExpressErrors extends Error{
    constructor(statusCode,msg){
        super();
        this.statusCode=statusCode;
        this.msg=msg;
    }
}

export default ExpressErrors;