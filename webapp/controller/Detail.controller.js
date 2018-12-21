sap.ui.define([
	"com/perceptio/invoiceperceptio/InvoicePerceptio/controller/BaseController"
], function (Controller) {
	"use strict";

	return Controller.extend("com.perceptio.invoiceperceptio.InvoicePerceptio.controller.Detail", {
	     openFullScreenView: function() { 
	    	this.getRouter().navTo("fullscreen");	
	     },
	     selectedRate: null,
	     rateData: {},
	     tableModelObj: {
	     	requirement: '',
	     	customer: '',
	     	hours: '',
	     	rate: '',
	     	service: '',
	     	total: ''
	     },
	     tableModel: [],
	     viewModel: {
	     	description: '',
	     	service: '',
	     	hours: '',
	     	charge: ''
	     },
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Detail
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); //Get Hold of Router
			oRouter.getRoute("detail").attachPatternMatched(function(oEvent){
				var param = oEvent.getParameter("arguments").requirement;
				this.loadDynamicModels(this.navParameters.selectedRequirement[0]);
			}, this);
			this.loadStaticModels();
			//this.getView().setModel(new sap.ui.model.json.JSONModel(this.viewModel), "tarifa");
			//this.getView().setModel(new sap.ui.model.json.JSONModel(this.tableModel));
			//this.tableModel.tarifa = this.viewModel;
			this.viewModel.tableModel = this.tableModel;
			this.getView().setModel(new sap.ui.model.json.JSONModel(this.viewModel));
		},

		onChangeRate: function(oEvent)
		{
			var key = oEvent.getSource().getSelectedKey();
			var selectedRate = this.rateData.filter((item) => {
				return item.id == key;
			});
			this.selectedRate = selectedRate;
			selectedRate = selectedRate[0];
			this.viewModel.charge = selectedRate.charge;
			this.viewModel.description = selectedRate.name;
			this.getView().byId('serviceCb').setSelectedKey(selectedRate.service);
			this.viewModel.hours = this.navParameters.selectedRequirement[0].fields.aggregatetimespent/3600;
			this.getView().getModel().refresh();
		},

		onSaveRate: function(oEvent){
			var totalRate = Object.assign({}, this.tableModelObj);

			totalRate.requirement = this.navParameters.selectedRequirement[0].key;
			totalRate.customer = this.navParameters.selectedRequirement[0].fields.project.id;
			totalRate.hours = this.navParameters.selectedRequirement[0].fields.aggregatetimespent/3600;
			totalRate.charge = this.selectedRate[0].charge;
			totalRate.service = this.getView().byId('serviceCb').getSelectedItem().getText();
			totalRate.total = totalRate.charge * totalRate.hours;

			this.tableModel.push(totalRate);
			this.getModel().refresh();
		},

		loadDynamicModels: function(requirement) {
			var oItemTemplate = new sap.ui.core.ListItem();
			var comboBox = this.getView().byId("rateCb");

			oItemTemplate.bindProperty("text", "name");
			oItemTemplate.bindProperty("key", "id");

			comboBox.bindItems("/rate", oItemTemplate);
			var oModel = new sap.ui.model.json.JSONModel("model/rate.json");
			oModel.attachRequestCompleted(function(){
				var oData = oModel.oData.rate.filter((item) => {
					return item.customer == requirement.fields.project.id;
				});
				this.rateData = oData;
				comboBox.setModel(new sap.ui.model.json.JSONModel({"rate": oData}));
			}.bind(this));
		},

		loadStaticModels: function() {
			var oItemTemplate = new sap.ui.core.ListItem();
			var comboBox = this.getView().byId("serviceCb");

			oItemTemplate.bindProperty("text", "name");
			oItemTemplate.bindProperty("key", "id");

			comboBox.bindItems("/service", oItemTemplate);
			var oModel = new sap.ui.model.json.JSONModel("model/service.json");
			comboBox.setModel(oModel);
		},

		onBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			window.history.go(-1);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});