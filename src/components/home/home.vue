<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
		<header class="main-header">
			<router-link to="/home/index">
				<a href="#" class="logo">
					<span class="logo-lg">LOGO</span>
				</a>
			</router-link>
			<nav class="navbar navbar-static-top justify-content-end">
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<li class="dropdown user user-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="display:block;line-height: 50px;margin-top: -7px;margin-bottom: -7px;">
								<span>个人中心</span>
							</a>
							<ul class="dropdown-menu" style="margin-top: 6px;">
								<!-- User image -->
								<li class="user-header">
									<p>
										快乐工作每一天
									</p>
								</li>
								<!-- Menu Footer-->
								<li class="user-footer">
									<div class="float-left">
										<router-link to="/home/grzl">
											<a href="#" class="btn btn-default btn-flat">个人资料</a>
										</router-link>
									</div>
									<div class="float-left">
										<router-link to="/home/sgmm">
											<a href="#" class="btn btn-default btn-flat">修改密码</a>
										</router-link>
									</div>
									<div class="float-right" @click="logout">
										<a href="#" class="btn btn-danger btn-flat">注销</a>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- 侧边栏 -->
		<aside class="main-sidebar">
			<section class="sidebar" style="height: auto;">
				<ul class="sidebar-menu tree" data-widget="tree">
					<li class="header">菜单</li>
					<li class="treeview" v-for="(item,index) in menus">
						<a href="#" v-if="item.jurFlag == '0'">
							<i class="fa fa-share"></i> <span>{{item.jurName}}</span>
							<span class="pull-right-container">
								<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<router-link v-else :to="item.jurFlag">
							<a href="#">
								<i class="fa fa-share"></i> <span>{{item.jurName}}</span>
							</a>
						</router-link>
						<ul class="treeview-menu" style="display: none;">
							<li class="treeview" v-for="(item21,index21) in item.list" v-if="item21.JurFlag == '0'">
								<a href="#">
									<i class="fa fa-circle-o"></i> {{item21.jurName}}
									<span class="pull-right-container">
										<i class="fa fa-angle-left pull-right"></i>
									</span>
								</a>
								<!-- <ul class="treeview-menu" style="display: none;">
									<li><a href="#"><i class="fa fa-circle-o"></i> Level Two</a></li>
									<li class="treeview">
										<a href="#"><i class="fa fa-circle-o"></i> Level Two
											<span class="pull-right-container">
												<i class="fa fa-angle-left pull-right"></i>
											</span>
										</a>
										<ul class="treeview-menu" style="display: none;">
											<li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
											<li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
										</ul>
									</li>
								</ul> -->
							</li>
							<li v-for="(item22,index22) in item.list" v-if="item22.JurFlag != '0'">
								<router-link :to="item22.jurFlag">
									<a href="#">
										<i class="fa fa-circle-o"></i> {{item22.jurName}}
									</a>
								</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</section>
			<!-- /.sidebar -->
		</aside>
		<!-- 内容 -->
		<div class="content-wrapper">
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				// 				menuback: {
				// 					backgroundImage: 'url(' + require('../../assets/img/timg.jpg') + ')',
				// 					backgroundSize: '230 44'
				// 				},
				menus: []
			}
		},
		created: function() {
			// 获取当前登陆人权限
			this.authority();
		},
		methods: {
			clickto: function(o) {
				this.$router.replace({
					path: '/home/' + o
				});
			},
			authority: function() {
				var obj = this;
				obj.$http({
					method: 'get',
					url: '/authority/authority',
					data: {}
				}).then((res) => {
					if (res.data.success) {
						obj.$data.menus = res.data.data;
						var a = '';
						obj.$data.menus.forEach(function(e, index) {
							if (e.jurType == '0') {
								a += e.jurFlag + ",";
								if (e.list.length > 0) {
									a += obj.jur(e.list, a);
								}
							}
						});
						window.localStorage.setItem('role', a);
					} else {
						obj.$data.menus = [];
					}
				}).catch(function(error) {
					alert('错误' + error);
				});
			},
			logout: function() {
				let token = window.localStorage.getItem('LTokenD');
				if (token && token != '') {
					window.localStorage.clear();
				}
				this.$router.push({
					path: '/'
				});
			},
			jur: function(obj, a) {
				var ob = this;
				obj.forEach(function(e, index) {
					a += e.jurFlag + ",";
					if (e.list.length > 0) {
						a += ob.jur(e, a);
					}
				});
				return a;
			}
		}
	}
</script>

<style>
</style>
