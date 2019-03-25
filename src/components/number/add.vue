<template>
  <div class="box-body">
    <div class="form-group">
      <label for="exampleInputEmail12">品牌</label>
      <select v-model="brandId" class="form-control" id="exampleInputEmail12" placeholder="品牌">
        <option value="">请选择</option>
        <option v-for="(item,index) in brands" :value="item.uuid">{{item.brandName}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">型号</label>
      <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" placeholder="型号">
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="save">确定</button>
      <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">关闭</font>
        </font>
      </button>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				brandId:'',
				brands:[]
			}
		},
		created: function() {
		  this.getDepDatas();
		},
		methods: {
		  getDepDatas: function() {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/carbrand/find/all',
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.brands = res.data.data;
					} else {
						obj.$data.brands = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			save: function() {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/carnumber/carnumber',
					data: {
						numberName: this.name,
            carBrandModel: {
                uuid:this.brandId
            }
					}
				}).then((res) => {
					alert(res.data.message);
					if (res.data.success) {
						obj.$data.name = '';
						this.$parent.page();
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
		}
	}



</script>

<style>
</style>
