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
		onInit: function () {
			var urlCustomerJira = "";
			urlCustomerJira = "https://190.248.92.106:64001/rest/api/2/search?jql=project=10807&startAt=0&maxResults=10&fields=issuetype,summary,status,created,timespent,aggregatetimespent,timeoriginalestimate,customfield_11002";
			urlCustomerJira = "https://190.248.92.106:64001/rest/api/2/project";

			var oItemTemplate = new sap.ui.core.ListItem();
			oItemTemplate.bindProperty("text", "name");
			comboBox.bindItems("/customers", oItemTemplate);

			var comboBox = this.getView().byId("box1");
		

			$.ajax({
				type: "GET",
				url : urlCustomerJira,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": "Basic " + btoa("jovanny.castro" + ":" + "Jova1017219182")
                },
				dataType: "json",
				success: function(data,textStatus,jqXHR) {
					comboBox.setModel(new sap.ui.model.json.JSONModel({"customers": data}));
        		}
        	});
		},
			
		onChangeCustomer: function(oEvent){
/*			
			var customerItem = oEvent.getSource();
			var tb1 = this.getView().byId("year");
*/	
			var table_invoice = this.getView().byId("Table_invoice");
			var oitems = table_invoice.getItems();
			if (oitems.length == 1) {
			 alert("Error no se encuentran datos");
			}
		},
		
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