export const tabPages={
    data(){
        return {
            size:10,
            page:1,
            total:0,
            list:[],
        }
    },
    methods:{
        handleSizeChange(val) {
            this.getData(this.page,val)
        },
        handleCurrentChange(val) {
            this.getData(val,this.size)
        },
        prev(val) {
            this.getData(val,this.size)
        },
        next(val) {
            this.getData(val,this.size)
        },
    },
    created() {
        this.getData(this.page,this.size)
    }
}