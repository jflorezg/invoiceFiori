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
			var urlCustomers = "https://190.248.92.106:64001/rest/api/2/project";

			var oItemTemplate = new sap.ui.core.ListItem();
			oItemTemplate.bindProperty("text", "name");
			oItemTemplate.bindProperty("key", "id");

			var comboBox = this.getView().byId("box1");
			comboBox.bindItems("/customers", oItemTemplate);

			$.ajax({
				type: "GET",
				url : urlCustomers,
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
		
		onPressRequirement: function(oEvent){
			 var selectedObject	= oEvent.getSource().getModel().oData.issues.filter((item) => {
				return item.id == oEvent.getSource().getNumber();
			});
			console.log(selectedObject);
			this.getRouter().navTo("detail", {
				requirement: oEvent.getSource().getNumber(),
				requirementObj : selectedObject
			});
		},

		onChangeCustomer: function(oEvent){
			var customerItem = oEvent.getSource();

			var oItemTemplate = new sap.m.ObjectListItem({
				title: "{key}",
				type: "Active",
				press: [this.onPressRequirement, this]
			});
			oItemTemplate.bindProperty("number", "id");

			var listReq = this.getView().byId("list_requirement");
			listReq.bindItems("/issues", oItemTemplate);

			var urlRequirementJira = `
				https://190.248.92.106:64001/rest/api/2/search?jql=project=` + customerItem.getSelectedKey() + `
					&startAt=0
					&maxResults=10
					&fields=issuetype,summary,status,created,timespent,aggregatetimespent,timeoriginalestimate,customfield_11002
			`;
			$.ajax({
				type: "GET",
				url : urlRequirementJira,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": "Basic " + btoa("jovanny.castro" + ":" + "Jova1017219182")
                },
				dataType: "json",
				success: function(data,textStatus,jqXHR) {
					listReq.setModel(new sap.ui.model.json.JSONModel(data));
        		}
        	});
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