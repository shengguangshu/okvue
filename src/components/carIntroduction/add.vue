<template>
  <div class="box-body">
    <div class="form-group">
      <label for="exampleInputEmail1">品牌名称</label>
      <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" placeholder="品牌名称">
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
				name: ''
			}
		},
		created: function() {},
		methods: {
			save: function() {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/carbrand/carbrand',
					data: {
						brandName: this.name
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
