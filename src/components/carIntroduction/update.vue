<template>
	<div class="box-body">
		<div class="form-group">
			<label for="exampleInputEmail1">部门名称</label>
			<input type="text" v-model="brandName" class="form-control" id="exampleInputEmail1" placeholder="部门名称">
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
				brandName: '',
				uuid: '',
				version: 0
			}
		},
		created: function() {},
		methods: {
			getData: function(uuid) {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/carbrand/carbrand/' + uuid,
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.uuid = res.data.data.uuid;
						obj.$data.brandName = res.data.data.brandName;
						obj.$data.version = res.data.data.version;
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			save: function() {
				var obj = this;
				obj.$http({
					method: 'put',
					url: '/carbrand/carbrand/' + obj.$data.uuid,
					data: {
						brandName: this.brandName,
						version: obj.$data.version
					}
				}).then((res) => {
					alert(res.data.message);
					if (res.data.success) {
						obj.$data.brandName = '';
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
