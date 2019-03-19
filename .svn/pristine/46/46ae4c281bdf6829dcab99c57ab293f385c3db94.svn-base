<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3" style="border-bottom: 1px solid aqua;">
				<h5>部门</h5>
			</div>
			<div class="col-sm-3" style="border-bottom: 1px solid aqua;">
				<h5>职位</h5>
			</div>
			<div class="col-sm-6" style="border-bottom: 1px solid aqua;">
				<h5>权限</h5>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-3">
				<div class="col-sm-12" v-for="(item,index) in deps">
					<div class="col-sm-12" @click="position(item.uuid)">{{item.depName}}</div>
					<div class="col-sm-12" v-for="(item2,index) in item.modelList">
						<div class="col-sm-12" @click="position(item2.uuid)">{{item2.depName}}</div>
						<div class="col-sm-12" v-for="(item3,index) in item2.modelList">
							<div class="col-sm-12" @click="position(item3.uuid)">{{item3.depName}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="col-sm-12" v-for="(item,index) in poss">
					<div class="col-sm-12" @click="jurisdiction(item.uuid)">{{item.posName}}</div>
					<div class="col-sm-12" v-for="(item2,index) in item.modelList">
						<div class="col-sm-12" @click="jurisdiction(item.uuid)">{{item2.posName}}</div>
						<div class="col-sm-12" v-for="(item3,index) in item2.modelList">
							<div class="col-sm-12" @click="jurisdiction(item.uuid)">{{item3.posName}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="col-sm-12" v-for="(item,index) in jurs" style="margin-top: 5px;">
					<div class="row">
						<div class="col-sm-3">{{item.jurName}}</div>
						<div class="col-sm-3">{{item.jurType == '0' ? '菜单' : '按钮'}}</div>
						<div class="col-sm-3">{{item.jurFlag}}</div>
						<div class="col-sm-3" v-if="item.isy != null"><input type="button" value="取消" class="btn btn-danger btn-sm"
							 @click="setJur(item.uuid)" /></div>
						<div class="col-sm-3" v-else><input type="button" value="授权" class="btn btn-primary btn-sm" @click="setJur(item.uuid)" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'qxgl',
		data() {
			return {
				deps: [],
				poss: [],
				jurs: [],
				posId: null
			}
		},
		created: function() {
			// 获取所有的部门
			this.department();
		},
		methods: {
			department: function() {
				var obj = this;
				obj.$data.jurs = [];
				obj.$http({
					method: 'get',
					url: '/department/department/all',
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.deps = res.data.data;
					} else {
						obj.$data.deps = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			position: function(o) {
				var obj = this;
				obj.$data.jurs = [];
				obj.$http({
					method: 'get',
					url: '/position/byDepId/' + o,
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.poss = res.data.data;
					} else {
						obj.$data.poss = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			jurisdiction: function(o) {
				var obj = this;
				obj.$data.posId = o;
				obj.$http({
					method: 'get',
					url: '/jurisdiction/findByPosId/' + o,
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.jurs = res.data.data;
					} else {
						obj.$data.jurs = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			setJur: function(o) {
				var obj = this;
				var p = obj.$data.posId;
				obj.$http({
					method: 'post',
					url: '/authority/authority',
					data: {
						autPostId: p,
						autJurId: o
					}
				}).then((res) => {
					if (res.data.success) {
						obj.jurisdiction(p);
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
