sap.ui.define([
	"com/perceptio/invoiceperceptio/InvoicePerceptio/controller/BaseController"
], function (Controller) {
	"use strict";

	return Controller.extend("com.perceptio.invoiceperceptio.InvoicePerceptio.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Master
		 */
		onInit: function() {
			var urlCustomerJira = "https://190.248.92.106:443/rest/api/2/project";
			/*
			$.ajax({
				type: "GET",
				url : urlCustomerJira,
				dataType: "json",
				success: function(data,textStatus,jqXHR) {
					//console.log(data);
					var oCustomer = new sap.ui.model.json.JSONModel("model/customer.json");
					this.getView().setModel(oCustomer, "customer");
        		}
        	});
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(urlCustomerJira, false, "GET");
			oModel.attachRequestSent(function(){
				console.log("hola");
				var oCustomer = new sap.ui.model.json.JSONModel("model/customer.json");
				this.getView().setModel(oCustomer, "customer");
			});
        	*/
        	var comboBox= this.getView().byId("box1");
			var oCustomer = new sap.ui.model.json.JSONModel();
			oCustomer.loadData("model/customer.json");
			comboBox.setModel(oCustomer);
			var oItemTemplate1 = new sap.ui.core.ListItem();

		oItemTemplate1.bindProperty("text", "name");

		comboBox.bindItems("/customers", oItemTemplate1);

// Attach the ComboBox to the page

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.perceptio.invoiceperceptio.InvoicePerceptio.view.Master
		 */
		//	onExit: function() {
		//
		//	}

	});

});