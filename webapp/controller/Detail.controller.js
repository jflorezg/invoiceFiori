sap.ui.define([
	"com/perceptio/invoiceperceptio/InvoicePerceptio/controller/BaseController"
], function (Controller) {
	"use strict";

	return Controller.extend("com.perceptio.invoiceperceptio.InvoicePerceptio.controller.Detail", {
     openFullScreenView: function() { 
    	this.getRouter().navTo("fullscreen");	
     },
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Detail
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); //Get Hold of Router
			oRouter.getRoute("detail").attachPatternMatched(function(oEvent){
				this.loadModels(oEvent.getParameter("arguments").requirement);
			}, this);
		},

		loadModels: function(requirement) {
			var oItemTemplate = new sap.ui.core.ListItem();
			var comboBox = this.getView().byId("serviceCb");

			oItemTemplate.bindProperty("text", "name");
			oItemTemplate.bindProperty("key", "id");

			comboBox.bindItems("/service", oItemTemplate);
			var oData = new sap.ui.model.json.JSONModel("model/service.json");
			comboBox.setModel(oData);
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