<template>
	<div class="wrapper" style="height: auto; min-height: 100%;">

		<!-- Main Header -->
		<header class="main-header">

			<!-- Logo -->
			<a href="#" class="logo" @click="clickto('')">
				<!-- mini logo for sidebar mini 50x50 pixels -->
				<!-- <span class="logo-mini"><b>A</b>LT</span> -->
				<!-- logo for regular state and mobile devices -->
				<span class="logo-lg">方达</span>
			</a>

			<!-- Header Navbar -->
			<nav class="navbar navbar-static-top" role="navigation" style="height: 50px;padding-top: 0;padding-bottom: 0;">
				<!-- Sidebar toggle button-->
				<a href="#" data-toggle="push-menu" role="button">
				</a>
				<!-- Navbar Right Menu -->
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<!-- User Account Menu -->
						<li class="dropdown user user-menu">
							<!-- Menu Toggle Button -->
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<!-- The user image in the navbar-->
								<!-- <img src="../../assets/img/user2-160x160.jpg" class="user-image" alt="User Image"> -->
								<!-- hidden-xs hides the username on small devices so only the image appears. -->
								<span class="hidden-xs">个人中心</span>
							</a>
							<ul class="dropdown-menu">
								<!-- The user image in the menu -->
								<!-- <li class="user-header">
									<img src="../../assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">

									<p>
										Alexander Pierce - Web Developer
										<small>Member since Nov. 2012</small>
									</p>
								</li> -->
								<!-- Menu Body -->
								<!-- <li class="user-body">
									<div class="row">
										<div class="col-xs-4 text-center">
											<a href="#">Followers</a>
										</div>
										<div class="col-xs-4 text-center">
											<a href="#">Sales</a>
										</div>
										<div class="col-xs-4 text-center">
											<a href="#">Friends</a>
										</div>
									</div>
								</li> -->
								<!-- Menu Footer-->
								<li class="user-footer">
									<div class="pull-left">
										<a href="#" class="btn btn-default btn-flat" @click="clickto('grzx')">个人资料</a>
									</div>
									<div class="pull-left">
										<a href="#" class="btn btn-default btn-flat" @click="clickto('xgmm')">修改密码</a>
									</div>
									<div class="pull-right">
										<a href="#" class="btn btn-default btn-flat" @click="logout">注销</a>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- Left side column. contains the logo and sidebar -->
		<aside class="main-sidebar">

			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">

				<!-- Sidebar Menu -->
				<ul class="sidebar-menu tree" data-widget="tree">
					<li class="header">菜单</li>
					<!-- Optionally, you can add icons to the links -->
					<li class="treeview" v-for="(item,index) in menus">
						<a v-if="item.jurType == 0">
							<i class="fa fa-link"></i>
							<span>{{item.jurName}}</span>
							<span class="pull-right-container">
								<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<a v-else :to="item.jurFlag">
							{{item.jurName}}
						</a>
						<ul class="treeview-menu">
							<li v-for="(item2,index2) in item.list">
								<a @click="clickto(item2.jurFlag)">
									{{item2.jurName}}
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<!-- /.sidebar-menu -->
			</section>
			<!-- /.sidebar -->
		</aside>

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper" style="height: calc(100vh - 102px);">
			<!-- Content Header (Page header) -->
			<section class="content-header">

			</section>

			<!-- Main content -->
			<section class="content container-fluid">
				<router-view />
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->

		<!-- Main Footer -->
		<footer class="main-footer">
			<!-- To the right -->
			<div class="pull-right hidden-xs">
				Anything you want
			</div>
			<!-- Default to the left -->
			<strong>Copyright © 2016 <a href="#">Company</a>.</strong> All rights reserved.
		</footer>

	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				menuback: {
					backgroundImage: 'url(' + require('../../assets/img/timg.jpg') + ')',
					backgroundSize: '230 44'
				},
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
