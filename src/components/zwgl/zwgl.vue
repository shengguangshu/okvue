<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-6">
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
			<div class="col-sm-6">
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
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bmgl',
		data() {
			return {
				deps: [],
				poss: []
			}
		},
		created: function() {
			// 获取所有的部门
			this.position();
		},
		methods: {
			position: function() {
				var obj = this;
				obj.$data.jurs = [];
				obj.$http({
					method: 'get',
					url: '/position/position/all',
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
			}
		}
	}
</script>

<style>
</style>
