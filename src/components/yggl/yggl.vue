<template>
	<div class="content">
		<div class="row">
			<div class="col-sm-12">
				<div class="card">
					<div class="card-header">
						<div class="box-tools pull-right">
							<div class="input-group input-group-sm" style="width: 300px;">
								<input type="text" v-model="account" class="form-control" placeholder="账号">
								<input type="text" v-model="name" class="form-control" placeholder="姓名">
								<div class="input-group-btn">
									<button type="button" class="btn btn-primary btn-sm" @click="getDatas(1)">
										<i class="fa fa-search"></i>
									</button>
									<button type="button" class="btn btn-primary btn-sm">
										<i class="fa fa-plus"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="card-body">
						<table class="table table-hover">
							<tbody>
								<tr>
									<th>#</th>
									<th>账号</th>
									<th>姓名</th>
									<th>部门</th>
									<th>职位</th>
									<th>操作</th>
								</tr>
								<tr v-for="(item,index) in datas">
									<td>{{index+1}}</td>
									<td>{{item.account}}</td>
									<td>{{item.user.name}}</td>
									<td>{{item.depId}}</td>
									<td>{{item.posId}}</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'yggl',
		data() {
			return {
				datas: [],
				pageNow: 1,
				account: '',
				name: ''
			}
		},
		created: function() {
			this.getDatas(1);
		},
		methods: {
			getDatas: function(pageNow) {
				var obj = this;
				obj.$http({
					method: 'post',
					url: '/account/page/' + pageNow,
					data: {
						'account': this.account,
						'user.name': this.name
					}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.datas = res.data.data.content;
					} else {
						obj.$data.datas = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			}
		}
	}
</script>

<style>
</style>
