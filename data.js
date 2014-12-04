
// ====================== Inventory Data =========================

var storeUsers = new Ext.data.JsonStore({
	url:        'data.php',
	root:       'results',
	idProperty: 'UserName',
	fields: ['UserName', 'Admin'],
	
	baseParams: {
		table: 'Users'
	}
});

var storePrimaryUse = new Ext.data.JsonStore({
	url:        'data.php',
	root:       'results',
	idProperty: 'Primary_Use',
	fields: ['Primary_Use', 'Description'],
	
	baseParams: {
		table: 'PrimaryUses'
	}
});

var storePrimaryUseForAdmin = new Ext.data.JsonStore({
	url:        'data.php',
	root:       'results',
	idProperty: 'Primary_Use',
	fields: ['Primary_Use', 'Description'],
	
	listeners: {
		load: function(xstore, record, option) {
			var emptyEntry = new xstore.recordType({'Primary_Use': '', 'Description' : '[ NULL ]'});
			xstore.insert(record.length, emptyEntry);
		}
	},
	baseParams: {
		table: 'PrimaryUses'
	}
});

var storeSerial = new Ext.data.JsonStore({
	url:             'data.php',
	root:            'results',
	idProperty:      'Serial',
	successProperty: 'success',

	fields: ['Serial', 'Tag'],
	
	baseParams: {
		table: 'Tracking'
	}
});

var storeState = new Ext.data.JsonStore({
	url:        'data.php',
	root:       'results',
	idProperty: 'Current_State',
	fields: ['Current_State'],
	
	baseParams: {
		table: 'State'
	}
});

var storeBuildings = new Ext.data.JsonStore({
	url:        'data.php',
	root:       'results',
	idProperty: 'BuildingCode',
	fields: ['BuildingCode', 'Name'],
	
	baseParams: {
		table: 'Buildings'
	}
});


var storeLocations = new Ext.data.JsonStore({
        url:        'data.php',
        root:       'results',
        idProperty: 'Primary_Use',
        fields: ['Position'],

        baseParams: {
                table: 'Location'
        }
});

var storeMachineTypes = new Ext.data.JsonStore({
		url:		'data.php',
		root:		'results',
		idProperty:	'Machine_Type',
		fields: ['Machine_Type'],
		
		baseParams: {
				table: 'MachineTypes'
		}
});

var storeHardwareClasses = new Ext.data.JsonStore({
		url:		'data.php',
		root:		'results',
		idProperty:	'Hardware_Class',
		fields: ['Hardware_Class'],
		
		baseParams: {
				table: 'MachineTypes',
				column: 'Hardware_Class'
		}
});

var storeFormFactor = new Ext.data.JsonStore({
		url:		'data.php',
		root:		'results',
		idProperty:	'Form_Factor',
		fields: ['Form_Factor'],
		
		baseParams: {
				table: 'MachineTypes',
				column: 'Form_Factor'
		}
});

/* STWM EDIT*/
// Inventory Column Array
var colInventoryArray = [
	'Record_ID',
	'Serial',
	'Modified',
	'Updated_By',
	'Assigned_To',
	'Machine_Type',
	'Tag',
	'MAC1',
	'MAC2',
	'Wireless_MAC',
	'RAM',
	'Hard_Drive',
	'Image',
	'Status',
	'Primary_Use',
	'HRS_Code',
	'Effective_Date',
	'CWID',
	'Last_Name',
	'First_Name',
	'Building',
	'Room',
	'Location',
	'Comments',
	'Counter_Friendly',
	'DNR'
];

//Non-Administrator Update 
var fieldsInventory = [{
	fieldLabel: 'Record #',
	width:      50,
	readOnly:   true,
	fieldClass: 'readonly',
	name:       'Counter_Friendly'
},{
	fieldLabel: 'Serial', 
	width:      100,
	readOnly:   true,
	fieldClass: 'readonly',
	name:       'Serial'
},{
	fieldLabel: 'Modified',
	width:      150,
	readOnly:   true,
	fieldClass: 'readonly',
	name:      'Modified'
},{
	fieldLabel: 'Updated By',
	width:      150,
	readOnly:   true,
	fieldClass: 'readonly',
	name:      'Updated_By'
},{
	fieldLabel:    'Assigned To', 
	width:         200, 
	name:          'Assigned_To', 
	xtype:         'combo',
	hideTrigger: true, // by default, disabled
	value:         Inventory.UserName,
	readOnly:      true,
	fieldClass:    'readonly',
	hideTrigger: true,
	xtype:         'combo',
	store:         storeUsers,
	mode:          'remote',
	displayField:  'UserName',
	valueField:    'UserName', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{UserName}" class="x-combo-list-item">{UserName} </div></tpl>'
},{
	//fieldLabel: 'Machine Type',
	//width:      100,
	//name:       'Machine_Type',
	//readOnly:   true,
	//fieldClass: 'readonly',
	//validator:  function (str) {
	//       return (str.length == 0 || str.length <= 24);
	//	}
	fieldLabel: 'Machine Type',
	width:      100,
	name:       'Machine_Type',
	readOnly:   true,
	fieldClass: 'readonly',
	hideTrigger: true,
	xtype:         'combo',
	store:         storeMachineTypes, //check this
	mode:          'remote',
	displayField:  'Machine_Type',
	valueField:    'Machine_Type', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Machine_Type}" class="x-combo-list-item">{Machine_Type} </div></tpl>'
	
},{
	fieldLabel: 'Tag',
	width:      70,
	name:       'Tag',
	readOnly:   true,
	fieldClass: 'readonly',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'MAC1',
	width:      100,
	name:       'MAC1',
	vtype:      'MAC',
	readOnly:   true,
	fieldClass: 'readonly',
	maskRe:     /^[0-9A-Fa-f]$/
},{
	fieldLabel: 'MAC2',
	width:      100,
	name:       'MAC2',
	vtype:      'MAC',
	readOnly:   true,
	fieldClass: 'readonly',
	maskRe:     /^[0-9A-Fa-f]$/
},{
	fieldLabel: 'Wireless MAC',
	width:      100,
	name:       'Wireless_MAC',
	vtype:      'MAC',
	readOnly:   true,
	fieldClass: 'readonly',
	maskRe:     /^[0-9A-Fa-f]$/
},{
	fieldLabel: 'RAM (GB)',
	width:      45,
	name:       'RAM',
	readOnly:   true,
	fieldClass: 'readonly',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'HDD (GB)',
	width:      45,
	name:       'Hard_Drive',
	readOnly:   true,
	fieldClass: 'readonly',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'Image',
	width:      150,
	name:       'Image',
	readOnly:   true,
	fieldClass: 'readonly',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 24);
	}
},{
	fieldLabel:   'Status',
	width:        100,
	name:         'Status',
	readOnly:     true,
	fieldClass:   'readonly',
	hideTrigger: true,
	xtype:        'combo',
	store:        storeState,
	mode:         'remote',
	displayField: 'Current_State',
	valueField:   'Current_State', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Current_State}" class="x-combo-list-item">{Current_State}</div></tpl>'
},{
	fieldLabel:   'Primary Use',
	width:        70,
	name:         'Primary_Use',
	readOnly:     true,
	fieldClass:   'readonly',
	hideTrigger: true,
	xtype:        'combo',
	store:        storePrimaryUse,
	mode:         'remote',
	displayField: 'Primary_Use',
	valueField:   'Primary_Use', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Primary_Use}" class="x-combo-list-item">{Primary_Use}</div></tpl>'
	// urpl testing begin
	// validator:  function (str) {
	// 	return (str.length == 0 || str.length <= 24);
	// urpl testing end
},{
	fieldLabel: 'HRS Code',
	width:      100,
	name:       'HRS_Code',
	readOnly:   true,
	fieldClass: 'readonly',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'Effective Date',
	width:      120,
	name:       'Effective_Date',
	format:     'Y-m-d',
	value:      new Date(),
	xtype:      'datefield',
	readOnly:   true,
	hideTrigger: true,
	fieldClass:   'readonly'
//	disabled:   true
},{
	fieldLabel: 'CWID',
	width:      150,
	name:       'CWID',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 25);
	}
},{
	fieldLabel: 'Last Name',
	width:      150,
	name:       'Last_Name',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 25);
	}
},{
	fieldLabel: 'First Name',
	width:      150,
	name:       'First_Name',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 15);
	}
},{
	fieldLabel:   'Building',
	width:        150,
	name:         'Building',
	readOnly:     true,
	xtype:        'combo',
	store:        storeBuildings,
	mode:         'remote',
	displayField: 'BuildingCode',
	valueField:   'BuildingCode', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Name} ({BuildingCode})" class="x-combo-list-item">{Name} ({BuildingCode})</div></tpl>'
},{
	fieldLabel: 'Room',
	width:      150,
	name:       'Room',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 14);
	}
},{
	fieldLabel: 'Location',
	width:      150,
	name:       'Location',
	//validator:  function (str) {
	//	return (str.length == 0 || str.length <= 24);
	//}
	//everything below this line is what I added
	readOnly:     true,
	xtype:	      'combo',
	store:        storeLocations,
	mode:	      'remote',
	displayField: 'Position',
	valueField:   'Position',
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Position}" class="x-combo-list-item">{Position}</div></tpl>'

	//Changes end here. 
	
},{
	fieldLabel: 'Comments',
	width:      150,
	name:       'Comments'
}];

//Administrator Update Form
var fieldsInventoryAdmin = [{
	fieldLabel: 'Record #',
	width:      50,
	readOnly:   true,
	fieldClass: 'readonly',
	name:       'Counter_Friendly'
},{
	fieldLabel: 'Serial', 
	width:      100,
	readOnly:   true,
	fieldClass: 'readonly',
	name:       'Serial'
},{
	fieldLabel: 'Modified',
	width:      150,
	readOnly:   true,
	fieldClass: 'readonly',
	name:      'Modified'
},{
	fieldLabel: 'Updated By',
	width:      150,
	readOnly:   true,
	fieldClass: 'readonly',
	name:      'Updated_By'
},{
	fieldLabel:    'Assigned To', 
	width:         200, 
	name:          'Assigned_To', 
	xtype:         'combo',
	disabled:      true, // by default, disabled
	value:         Inventory.UserName,
	readOnly:      true,
	xtype:         'combo',
	store:         storeUsers,
	mode:          'remote',
	displayField:  'UserName',
	valueField:    'UserName', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{UserName}" class="x-combo-list-item">{UserName} </div></tpl>'
},{
	/*fieldLabel: 'Machine Type',
	width:      100,
	name:       'Machine_Type',
	readOnly:   true,
	fieldClass: 'readonly',
	validator:  function (str) {
	       return (str.length == 0 || str.length <= 24);*/
	fieldLabel: 'Machine Type',
	width:      100,
	name:       'Machine_Type',
	readOnly:   true,
	hideTrigger: true,
	fieldClass: 'readonly',
	xtype:         'combo',
	store:         storeMachineTypes, //check this
	mode:          'remote',
	displayField:  'Machine_Type',
	valueField:    'Machine_Type', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Machine_Type}" class="x-combo-list-item">{Machine_Type} </div></tpl>'
},{
	fieldLabel: 'Tag',
	width:      70,
	name:       'Tag',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'MAC1',
	width:      100,
	name:       'MAC1',
	vtype:      'MAC',
	maskRe:     /^[0-9A-Fa-f]$/
},{
	fieldLabel: 'MAC2',
	width:      100,
	name:       'MAC2',
	vtype:      'MAC',
	maskRe:     /^[0-9A-Fa-f]$/
},{
	fieldLabel: 'Wireless MAC',
	width:      100,
	name:       'Wireless_MAC',
	vtype:      'MAC',
	maskRe:     /^[0-9A-Fa-f]$/
},{
	fieldLabel: 'RAM (GB)',
	width:      45,
	name:       'RAM',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'HDD (GB)',
	width:      45,
	name:       'Hard_Drive',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'Image',
	width:      150,
	name:       'Image',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 24);
	}
},{
	fieldLabel:   'Status',
	width:        100,
	name:         'Status',
	readOnly:     true,
	xtype:        'combo',
	store:        storeState,
	mode:         'remote',
	displayField: 'Current_State',
	valueField:   'Current_State', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Current_State}" class="x-combo-list-item">{Current_State}</div></tpl>'
},{
	fieldLabel:   'Primary Use',
	width:        70,
	name:         'Primary_Use',
	readOnly:     true,
	xtype:        'combo',
	store:        storePrimaryUse,
	mode:         'remote',
	displayField: 'Primary_Use',
	valueField:   'Primary_Use', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Primary_Use}" class="x-combo-list-item">{Primary_Use}</div></tpl>'
	// urpl testing begin
	// validator:  function (str) {
	// 	return (str.length == 0 || str.length <= 24);
	// urpl testing end
},{
	fieldLabel: 'HRS Code',
	width:      100,
	name:       'HRS_Code',
	validator:  function (str) {
		return (str.length == 0 || !isNaN(str));
	}
},{
	fieldLabel: 'Effective Date',
	width:      120,
	name:       'Effective_Date',
	format:     'Y-m-d',
	value:      new Date(),
	xtype:      'datefield',
	readOnly:   true
},{
	fieldLabel: 'CWID',
	width:      150,
	name:       'CWID',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 25);
	}
},{
	fieldLabel: 'Last Name',
	width:      150,
	name:       'Last_Name',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 25);
	}
},{
	fieldLabel: 'First Name',
	width:      150,
	name:       'First_Name',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 15);
	}
},{
	fieldLabel:   'Building',
	width:        150,
	name:         'Building',
	readOnly:     true,
	xtype:        'combo',
	store:        storeBuildings,
	mode:         'remote',
	displayField: 'BuildingCode',
	valueField:   'BuildingCode', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Name} ({BuildingCode})" class="x-combo-list-item">{Name} ({BuildingCode})</div></tpl>'
},{
	fieldLabel: 'Room',
	width:      150,
	name:       'Room',
	validator:  function (str) {
		return (str.length == 0 || str.length <= 14);
	}
},{
	fieldLabel: 'Location',
	width:      150,
	name:       'Location',
	//validator:  function (str) {
	//	return (str.length == 0 || str.length <= 24);
	//}
	//everything below this line is what I added
	readOnly:     true,
	xtype:	      'combo',
	store:        storeLocations,
	mode:	      'remote',
	displayField: 'Position',
	valueField:   'Position',
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Position}" class="x-combo-list-item">{Position}</div></tpl>'

	//Changes end here. 
	
},{
	fieldLabel:    'Mark As DNR', 
	width:         200, 
	name:          'DNR', 
	readOnly:      true,
	store:         new Ext.data.ArrayStore({
	        id: 0,
	        fields: [
	            'id',
	            'displayText'
	        ],
	        data: [[1, '1'], [0, '0']]
	    }),
	xtype:         'combo',
	value: 0,
	mode: 'local',
	displayField:  'displayText',
	valueField:    'id', 
	triggerAction: 'all',
	//tpl: '<tpl for="."><div ext:qtip="{displayText} (Value of {id})" class="x-combo-list-item">{displayText} (Value of {id})</div></tpl>',
	allowBlank:    false
},{
	fieldLabel: 'Comments',
	width:      150,
	name:       'Comments'
}];


var fieldsInventoryNewRecord = [{
	fieldLabel: 'Serial', 
	width:      100,
	name:       'Serial'
},{
	fieldLabel: 'Updated By',
	width:      150,
	readOnly:   true,
	fieldClass: 'readonly',
	name:       'Updated_By',
	value:      Inventory.UserName
},{
	/*fieldLabel: 'Machine Type',
	width:      100,
	name:       'Machine_Type'*/
	
	fieldLabel: 'Machine Type',
	width:      100,
	name:       'Machine_Type',
	readOnly:   true,
	fieldClass: 'readonly',
	xtype:         'combo',
	store:         storeMachineTypes, //check this
	mode:          'remote',
	displayField:  'Machine_Type',
	valueField:    'Machine_Type', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Machine_Type}" class="x-combo-list-item">{Machine_Type} </div></tpl>'
},{
	fieldLabel: 'Tag',
	width:      70,
	name:       'Tag'
},{
	fieldLabel: 'MAC1',
	width:      100,
	name:       'MAC1'
},{
	fieldLabel: 'MAC2',
	width:      100,
	name:       'MAC2'
},{
	fieldLabel: 'Wireless MAC',
	width:      100,
	name:       'Wireless_MAC'
},{
	fieldLabel: 'RAM (GB)',
	width:      45,
	name:       'RAM'
},{
	fieldLabel: 'HDD (GB)',
	width:      45,
	name:       'Hard_Drive'
},{
	fieldLabel: 'Image',
	width:      150,
	name:       'Image'
},{
	fieldLabel:   'Status',
	width:        100,
	name:         'Status',
	value:        'Received',
	fieldClass:   'readonly',
	readOnly:     true/*, 
	disabled:     true,
	xtype:        'combo',
	store:        storeState,
	mode:         'remote',
	displayField: 'Current_State',
	valueField:   'Current_State', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Current_State}" class="x-combo-list-item">{Current_State}</div></tpl>'*/
},{
	fieldLabel:   'Primary Use',
	width:        70,
	name:         'Primary_Use',
	readOnly:     true,
	xtype:        'combo',
	store:        storePrimaryUse,
	mode:         'remote',
	displayField: 'Primary_Use',
	valueField:   'Primary_Use', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Primary_Use}" class="x-combo-list-item">{Primary_Use}</div></tpl>'
},{
	fieldLabel: 'HRS Code',
	width:      100,
	name:       'HRS_Code'
},{
	fieldLabel: 'Effective Date',
	width:      80,
	name:       'Effective_Date'
},{
	fieldLabel: 'CWID',
	width:      150,
	name:       'CWID'
},{
	fieldLabel: 'Last Name',
	width:      150,
	name:       'Last_Name'
},{
	fieldLabel: 'First Name',
	width:      150,
	name:       'First_Name'
},{
	fieldLabel:   'Building',
	width:        150,
	name:         'Building',
	readOnly:     true,
	xtype:        'combo',
	store:        storeBuildings,
	mode:         'remote',
	displayField: 'BuildingCode',
	valueField:   'BuildingCode', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Name} ({BuildingCode})" class="x-combo-list-item">{Name} ({BuildingCode})</div></tpl>'
},{
	fieldLabel: 'Room',
	width:      150,
	name:       'Room'
},{
	fieldLabel: 'Location',//also changed this
	width:      150,
	name:       'Location'
},{
	fieldLabel: 'Comments',
	width:      150,
	name:       'Comments'
}];

//ADD NEW MACHINE TYPE
var fieldsInventoryNewMachineType = [{
	fieldLabel: 'Machine Type', 
	width:      150,
	name:       'Machine_Type',
	allowBlank:    false
},{
	fieldLabel: 'Hardware Class',
	width:      150,
	name:       'Hardware_Class',
	fieldClass: 'readonly',
	xtype:         'combo',
	store:         storeHardwareClasses, //check this
	mode:          'remote',
	displayField:  'Hardware_Class',
	valueField:    'Hardware_Class',
	triggerAction: 'all',
	allowBlank:    false,
	tpl: '<tpl for="."><div ext:qtip="{Hardware_Class}" class="x-combo-list-item">{Hardware_Class} </div></tpl>'
},{
	fieldLabel: 'Marketing Name',
	width:      150,
	name:       'Marketing_Name',
	allowBlank:    false
},{
	fieldLabel: 'Desktop Name',
	width:      150,
	name:       'Desktop_Name',
},{
	fieldLabel: 'Form Factor',
	width:      150,
	name:       'Form_Factor',
	fieldClass: 'readonly',
	xtype:         'combo',
	store:         storeFormFactor, //check this
	mode:          'remote',
	displayField:  'Form_Factor',
	valueField:    'Form_Factor', 
	triggerAction: 'all',
	allowBlank:    false,
	tpl: '<tpl for="."><div ext:qtip="{Form_Factor}" class="x-combo-list-item">{Form_Factor} </div></tpl>'
},{
	fieldLabel: 'Display Size',
	width:      50,
	name:       'Display_Size'
},{
	fieldLabel: 'Manufacturer',
	width:      100,
	name:       'Manufacturer',
	allowBlank:    false
},{
	fieldLabel:    'Network Device', 
	width:         100, 
	name:          'Network_Device', 
	readOnly:      true,
	store:         new Ext.data.ArrayStore({
	        id: 0,
	        fields: [
	            'id',
	            'displayText'
	        ],
	        data: [[1, '1'], [0, '0']]
	    }),
	xtype:         'combo',
	value: 0,
	mode: 'local',
	displayField:  'displayText',
	valueField:    'id', 
	triggerAction: 'all',
	//tpl: '<tpl for="."><div ext:qtip="{displayText} (Value of {id})" class="x-combo-list-item">{displayText} (Value of {id})</div></tpl>',
	allowBlank:    false
},{
	fieldLabel: 'RAM (GB)',
	width:      50,
	name:       'RAM'
},{
	fieldLabel: 'HDD (GB)',
	width:      50,
	name:       'HDD'
},];


// Inventory Columns
var colInventory = [{
	header: 'Records', 
	width: 50, 
	dataIndex: 'Counter_Friendly', 
	sortable: false // *** Cannot sort a non-existant field *** //
},{
	header: 'Modified', 
	width: 115, 
	dataIndex: 'Modified', 
	sortable: true
},{
	header: 'Updated By', 
	width: 120, 
	dataIndex: 'Updated_By', 
	sortable: true
},{
	header: 'Machine Type', 
	width: 80, 
	dataIndex: 'Machine_Type', 
	sortable: true
},{
	header: 'Serial', 
	minWidth: 70, 
	dataIndex: 'Serial', 
	sortable: true
},{
	header: 'Tag', 
	width: 80, 
	dataIndex: 'Tag', 
	sortable: true
},{
	header: 'Assigned To', 
	width: 120, 
	dataIndex: 'Assigned_To', 
	sortable: true
},{
	header: 'Effective Date', 
	width: 115, 
	dataIndex: 'Effective_Date', 
	sortable: true
},{
	header: 'Status', 
	width: 80, 
	dataIndex: 'Status', 
	sortable: true
},{
	header: 'HRS Code', 
	width: 50, 
	dataIndex: 'HRS_Code', 
	sortable: true
},{
	header: 'CWID', 
	width: 100, 
	dataIndex: 'CWID', 
	sortable: true
},{
	header: 'Last Name', 
	width: 100, 
	dataIndex: 'Last_Name', 
	sortable: true
},{
	header: 'First Name', 
	width: 100, 
	dataIndex: 'First_Name', 
	sortable: true
},{
	header: 'Building', 
	width: 50, 
	dataIndex: 'Building', 
	sortable: true
},{
	header: 'Room', 
	width: 80, 
	dataIndex: 'Room', 
	sortable: true
},{
	header: 'Location', 
	width: 80, 
	dataIndex: 'Location', 
	sortable: true
},{
	header: 'MAC1', 
	width: 85, 
	dataIndex: 'MAC1', 
	sortable: true
},{
	header: 'Primary Use', 
	width: 80, 
	dataIndex: 'Primary_Use', 
	sortable: true
},{
	header: 'MAC2', 
	width: 85, 
	dataIndex: 'MAC2', 
	sortable: true
},{
	header: 'Wireless MAC', 
	width: 85, 
	dataIndex: 'Wireless_MAC', 
	sortable: true
},{
	header: 'RAM (GB)', 
	width: 45, 
	dataIndex: 'RAM', 
	sortable: true
},{
	header: 'HDD (GB)', 
	width: 45, 
	dataIndex: 'Hard_Drive', 
	sortable: true
},{
	header: 'Image', 
	width: 100, 
	dataIndex: 'Image', 
	sortable: true
},{ /* STWM EDIT*/
	header: 'DNR', 
	width: 40, 
	dataIndex: 'DNR', 
	sortable: true,
	trueText: 'Yes',
	falseText: 'No'/*,
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		var retVal = "No";
		if(value == 1) {
			retVal = "Yes";
		}
		return retVal;
	}*/
	
},{
	header: 'Comments', 
	width: 200, 
	dataIndex: 'Comments', 
	sortable: true
}];

// Inventory Columns
var colInventoryHistory = [{
	header: 'Record ID', 
	width: 60, 
	dataIndex: 'Record_ID', 
	sortable: true
},{
	header: 'Modified', 
	width: 115, 
	dataIndex: 'Modified', 
	sortable: true
},{
	header: 'Updated By', 
	width: 120, 
	dataIndex: 'Updated_By', 
	sortable: true
},{
	header: 'Machine Type', 
	width: 80, 
	dataIndex: 'Machine_Type', 
	sortable: true
},{
	header: 'Serial', 
	minWidth: 70, 
	dataIndex: 'Serial', 
	sortable: true
},{
	header: 'Tag', 
	width: 80, 
	dataIndex: 'Tag', 
	sortable: true
},{
	header: 'Assigned To', 
	width: 120, 
	dataIndex: 'Assigned_To', 
	sortable: true
},{
	header: 'Effective Date', 
	width: 115, 
	dataIndex: 'Effective_Date', 
	sortable: true
},{
	header: 'Status', 
	width: 80, 
	dataIndex: 'Status', 
	sortable: true
},{
	header: 'HRS Code', 
	width: 50, 
	dataIndex: 'HRS_Code', 
	sortable: true
},{
	header: 'CWID', 
	width: 100, 
	dataIndex: 'CWID', 
	sortable: true
},{
	header: 'Last Name', 
	width: 100, 
	dataIndex: 'Last_Name', 
	sortable: true
},{
	header: 'First Name', 
	width: 100, 
	dataIndex: 'First_Name', 
	sortable: true
},{
	header: 'Building', 
	width: 50, 
	dataIndex: 'Building', 
	sortable: true
},{
	header: 'Room', 
	width: 100, 
	dataIndex: 'Room', 
	sortable: true
},{
	header: 'Position', 
	width: 80, 
	dataIndex: 'Location', 
	sortable: true
},{
	header: 'MAC1', 
	width: 85, 
	dataIndex: 'MAC1', 
	sortable: true
},{
	header: 'Primary Use', 
	width: 80, 
	dataIndex: 'Primary_Use', 
	sortable: true
},{
	header: 'MAC2', 
	width: 85, 
	dataIndex: 'MAC2', 
	sortable: true
},{
	header: 'Wireless MAC', 
	width: 85, 
	dataIndex: 'Wireless_MAC', 
	sortable: true
},{
	header: 'RAM (GB)', 
	width: 45, 
	dataIndex: 'RAM', 
	sortable: true
},{
	header: 'HDD (GB)', 
	width: 45, 
	dataIndex: 'Hard_Drive', 
	sortable: true
},{
	header: 'Image', 
	width: 80, 
	dataIndex: 'Image', 
	sortable: true
},{ /* STWM EDIT*/
	header: 'DNR', 
	width: 40, 
	dataIndex: 'DNR', 
	sortable: true,
	trueText: 'Yes',
	falseText: 'No'/*,
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		var retVal = "No";
		if(value == 1) {
			retVal = "Yes";
		}
		return retVal;
	}*/
	
},{
	header: 'Comments', 
	width: 200, 
	dataIndex: 'Comments', 
	sortable: true
}];


// Inventory Columns for BULK EDIT UNDER UNDER ADMINISTRATOR
var colInventoryBulk = [{
	header: 'Records', 
	width: 50, 
	dataIndex: 'Counter_Friendly', 
	hidden: true
},{
	header: 'Serial',
	minWidth: 60, 
	dataIndex: 'Serial', 
	sortable: true,
	editor: new Ext.form.TextField({
		readOnly: true,
		fieldClass: 'readonly',
	})
},{
	header: 'Modified', 
	width: 115, 
	dataIndex: 'Modified', 
	sortable: true,
	editor: new Ext.form.TextField({
		readOnly: true
	})
},{
	header: 'Updated By', 
	width: 120, 
	dataIndex: 'Updated_By', 
	sortable: true,
	editor: new Ext.form.TextField({
		readOnly: true
	})
},{
	header: 'Assigned To', 
	width: 120, 
	dataIndex: 'Assigned_To', 
	sortable: true,
	editor: new Ext.form.ComboBox({
		readOnly:     true,
		xtype:        'combo',
		store:        storeUsers,
		mode:         'remote',
		displayField: 'UserName',
		valueField:   'UserName', 
		triggerAction: 'all',
		tpl: '<tpl for="."><div ext:qtip="{UserName}" class="x-combo-list-item">{UserName} </div></tpl>'
	})
},{
	header: 'Machine Type', 
	width: 80, 
	dataIndex: 'Machine_Type', 
	sortable: true,
	editor: new Ext.form.ComboBox({
		readOnly:	true,
		xtype:		'combo',
		store:		storeMachineTypes,
		mode:		'remote',
		displayfield:	'Machine_Type',
		valueField:		'Machine_Type',
		triggerAction:	'all',
		tpl: '<tpl for="."><div ext:qtip="{Machine_Type}" class="x-combo-list-item">{Machine_Type}</div></tpl>'

	})
},{
	header: 'Tag', 
	width: 80, 
	dataIndex: 'Tag', 
	sortable: true,
	editor: new Ext.form.NumberField({
		allowBlank: true,
		allowNegative: true,
		minValue: 1,
		maxValue: 999999
	})
},{
	header: 'MAC1', 
	width: 85, 
	dataIndex: 'MAC1', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'MAC2', 
	width: 85, 
	dataIndex: 'MAC2', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'Wireless MAC', 
	width: 85, 
	dataIndex: 'Wireless_MAC', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'RAM (GB)', 
	width: 45, 
	dataIndex: 'RAM', 
	sortable: true,
	editor: new Ext.form.NumberField({
		allowBlank: true,
		allowNegative: false,
		allowDecimals: true,
		minValue: 1,
		maxValue: 128 // no one should ever need more than 640K memory
	})
},{
	header: 'HDD (GB)', 
	width: 45, 
	dataIndex: 'Hard_Drive', 
	sortable: true,
	editor: new Ext.form.NumberField({
		allowBlank: true,
		allowNegative: false,
		allowDecimals: true,
		minValue: 1
	})
},{
	header: 'Image', 
	width: 80, 
	dataIndex: 'Image', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'Status', 
	width: 100, 
	dataIndex: 'Status', 
	sortable: true,
	editor: new Ext.form.ComboBox({
		readOnly:     true,
		store:        storeState,
		mode:         'remote',
		displayField: 'Current_State',
		valueField:   'Current_State', 
		triggerAction: 'all',
		tpl: '<tpl for="."><div ext:qtip="{Current_State}" class="x-combo-list-item">{Current_State}</div></tpl>'
	})
},{
	header: 'Primary Use', 
	width: 50, 
	dataIndex: 'Primary_Use', 
	sortable: true,
	editor: new Ext.form.ComboBox({
		readOnly:     true,
		store:        storePrimaryUseForAdmin,
		mode:         'remote',
		displayField: 'Description',
		valueField:   'Primary_Use', 
		triggerAction: 'all',
		tpl: '<tpl for="."><div ext:qtip="{Primary_Use}" class="x-combo-list-item">{Description}</div></tpl>'
	})
},{
	header: 'HRS Code', 
	width: 50, 
	dataIndex: 'HRS_Code', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header:     'Effective Date', 
	width:      115, 
	dataIndex:  'Effective_Date', 
	sortable:   true,
	editor:     new Ext.form.TextField() //HAX: datepicker
},{
	header: 'CWID', 
	width: 100, 
	dataIndex: 'CWID', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'Last Name', 
	width: 100, 
	dataIndex: 'Last_Name', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'First Name', 
	width: 100, 
	dataIndex: 'First_Name', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	header: 'Building', 
	width: 50, 
	dataIndex: 'Building', 
	sortable: true,
	editor: new Ext.form.ComboBox({
		readOnly:     true,
		store:        storeBuildings,
		mode:         'remote',
		displayField: 'BuildingCode',
		valueField:   'BuildingCode', 
		triggerAction: 'all',
		tpl: '<tpl for="."><div ext:qtip="{Name} ({BuildingCode})" class="x-combo-list-item">{Name} ({BuildingCode})</div></tpl>'
	})
},{
	header: 'Room', 
	width: 100, 
	dataIndex: 'Room', 
	sortable: true,
	editor: new Ext.form.TextField()
},{
	//header: 'Position', 
	//width: 80, 
	//dataIndex: 'Location', 
	//sortable: true,
	//editor: new Ext.form.TextField()
	header: 'Position',
        width: 80,
        dataIndex: 'Location',
        sortable: true,
        editor: new Ext.form.ComboBox({
                store:        storeLocations,
                mode:         'remote',
                displayField: 'Position',
                valueField:   'Position',
                triggerAction: 'all',
                readOnly:     false,
                minChars: 1,
				typeAhead: true,
				typeAheadDelay: 0,
				autoSelect: true,
				forceSelection: true,
                tpl: '<tpl for="."><div ext:qtip="{Position}" class="x-combo-list-item">{Position}</div></tpl>'
	})

},{ /* STWM EDIT*/
	header: 'DNR', 
	width: 40, 
	dataIndex: 'DNR', 
	sortable: true,
	trueText: 'Yes',
	falseText: 'No',
	editor: new Ext.form.TextField({
		allowBlank: false
	})/*,
	renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		var retVal = "No";
		if(value == 1) {
			retVal = "Yes";
		}
		return retVal;
	}*/
	
},{
	header: 'Comments', 
	width: 200, 
	dataIndex: 'Comments', 
	sortable: true,
	editor: new Ext.form.TextField()
}];

var colReceiving = [{
	id:        'serial',
	header:    'Serial',
	dataIndex: 'Serial',
	width:     220,
	
	editor: new Ext.form.TextField({
		allowBlank: false
	})
},{
	header: 'Tag',
	dataIndex: 'Tag',
	width: 70,
	
	editor: new Ext.form.NumberField({
		allowBlank: true,
		allowNegative: true,
		minValue: 1,
		maxValue: 999999
	})
},{
	header: 'MAC 1',
	dataIndex: 'MAC1',
	width: 115,
	
	editor: new Ext.form.TextField({
		vtype: 'macAddress',
		allowBlank: true
	})
},{
	header: 'MAC 2',
	dataIndex: 'MAC2',
	width: 115,
	
	editor: new Ext.form.TextField({
		vtype: 'macAddress',
		allowBlank: true
	})
},{
	header: 'Wireless MAC',
	dataIndex: 'Wireless_MAC',
	width: 115,
	
	editor: new Ext.form.TextField({
		vtype: 'macAddress',
		allowBlank: true
	})
}]



var fieldsReceiving = [{
	fieldLabel: 'Serial Recognition', 
	width:      100,
	fieldClass: 'readonly',
	name:       'Serial'
},{
	fieldLabel: 'Serial Strip Leading',
	width:      150,
	readOnly:   true,
	fieldClass: 'readonly',
	name:       'Updated_By',
	value:      Inventory.UserName
},{
	fieldLabel: 'Tag Range',
	width:      100,
	name:       'Machine_Type'
},{
	fieldLabel: 'Tag',
	width:      70,
	name:       'Tag'
},{
	fieldLabel: 'MAC1',
	width:      100,
	name:       'MAC1'
},{
	fieldLabel: 'MAC2',
	width:      100,
	name:       'MAC2'
},{
	fieldLabel: 'Wireless MAC',
	width:      100,
	name:       'Wireless_MAC'
},{
	fieldLabel: 'RAM (GB)',
	width:      45,
	name:       'RAM'
},{
	fieldLabel: 'HDD (GB)',
	width:      45,
	name:       'Hard_Drive'
},{
	fieldLabel: 'Image',
	width:      150,
	name:       'Image'
},{
	fieldLabel:   'Status',
	width:        100,
	name:         'Status',
	readOnly:     true,
	xtype:        'combo',
	store:        storeState,
	mode:         'remote',
	displayField: 'Current_State',
	valueField:   'Current_State', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Current_State}" class="x-combo-list-item">{Current_State}</div></tpl>'
},{
	fieldLabel:   'Primary Use',
	width:        70,
	name:         'Primary_Use',
	readOnly:     true,
	xtype:        'combo',
	store:        storePrimaryUse,
	mode:         'remote',
	displayField: 'Primary_Use',
	valueField:   'Primary_Use', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Primary_Use}" class="x-combo-list-item">{Primary_Use}</div></tpl>'
},{
	fieldLabel: 'HRS Code',
	width:      100,
	name:       'HRS_Code'
},{
	fieldLabel: 'Effective Date',
	width:      80,
	name:       'Effective_Date',
	value:      new Date()
},{
	fieldLabel: 'CWID',
	width:      150,
	name:       'CWID'
},{
	fieldLabel: 'Last Name',
	width:      150,
	name:       'Last_Name'
},{
	fieldLabel: 'First Name',
	width:      150,
	name:       'First_Name'
},{
	fieldLabel:   'Building',
	width:        150,
	name:         'Building',
	readOnly:     true,
	xtype:        'combo',
	store:        storeBuildings,
	mode:         'remote',
	displayField: 'BuildingCode',
	valueField:   'BuildingCode', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Name} ({BuildingCode})" class="x-combo-list-item">{Name} ({BuildingCode})</div></tpl>'
},{
	fieldLabel: 'Room',
	width:      150,
	name:       'Room'
},{
	//fieldLabel: 'Position',
	//width:      150,
	//name:       'Location'
	fieldLabel: 'Location',
        width:      150,
        name:       'Location',
        readOnly:     true,
        xtype:        'combo',
        store:        storeLocations,
        mode:         'remote',
        displayField: 'Position',
        valueField:   'Position',
        triggerAction: 'all',
        tpl: '<tpl for="."><div ext:qtip="{Position}" class="x-combo-list-item">{Position}</div></tpl>'

},{
	fieldLabel: 'Comments',
	width:      150,
	name:       'Comments'
}];

var storeFields = new Ext.data.ArrayStore({
	fields: [
		'Field'
	],
	data: [
	    // derp
		[ 'Assigned_To' ] ,
		[ 'Machine_Type' ],
		[ 'Tag' ],
		[ 'MAC1' ],
		[ 'MAC2' ],
		[ 'Wireless_MAC' ],
		[ 'RAM' ],
		[ 'Hard_Drive' ],
		[ 'Image' ],
		[ 'Status' ],
		[ 'Primary_Use' ],
		[ 'HRS_Code' ],
		[ 'Effective_Date' ],
		[ 'CWID' ],
		[ 'Last_Name' ],
		[ 'First_Name' ],
		[ 'Building' ],
		[ 'Room' ],
		/*STWM EDIT*/
		[ 'DNR'],
		[ 'Location' ],
		[ 'Comments' ]
    ]
});
	
	
	var bulkTestData = {
		results: [{
			Scannable: false, 
			Field: 'Assigned_To',  
			Value: 'Paul.Laibach'
		},{
			Scannable: true, 
			Field:  'Serial', 
			Mask:   '1SMJ1', 
			Strip:  '1S' 
		},{
			Scannable: true, 
			Field:  'MAC1', 
			Mask:   '001E', 
			Strip:  ''
		},{ 
			Scannable: true, 
			Field:  'Tag', 
			Mask:   '20000-30000'
		}]
	};

	
	
var colDepOut = [{
	header:    'Serial', 
	minWidth:  60,
	name:      'Serial',
	dataIndex: 'Serial', 
	sortable:  true,
	
	editor: new Ext.form.TextField()
	/*editor: new Ext.form.ComboBox({
		title:         'Serial (Tag)',
		store:         storeSerial,
		typeAhead:     true,
		triggerAction: true,
		mode:          'remote',
		valueField:    'Serial',
		displayField:  'Serial',
		triggerAction: 'all',
		tpl: '<tpl for="."><div ext:qtip="{Serial}" class="x-combo-list-item">{Serial} ({Tag})</div></tpl>'
	})*/
},{
	header:    'Tag', 
	width:     80, 
	name:      'Tag',
	dataIndex: 'Tag', 
	sortable:  true,
	
	editor: new Ext.form.NumberField({
		allowBlank:    true,
		allowNegative: true,
		minValue:      1,
		maxValue:      999999
	})
}];
	
// Inventory Columns for BULK EDIT
var colBulkEdit = [{
	header:    'Scannable', 
	width:     50, 
	dataIndex: 'Scannable', 
	sortable:  false,
	
	editor: new Ext.form.Checkbox({
		checked: false
	})
},{
	header:        'Field', 
	dataIndex:     'Field', 
	sortable:      false,
	
	editor: new Ext.form.ComboBox({
		readOnly:      true,
		store:         storeFields,
		typeAhead:     true,
		triggerAction: true,
		mode:          'local',
		valueField:    'Field',
		displayField:  'Field'
	})
},{
	id:        'Value',
	header:    'Value',
	dataIndex: 'Value',
	sortable:  false,
	
	editor: new Ext.form.TextField()
},{
	id:        'Mask',
	header:    'Mask',
	dataIndex: 'Mask',
	sortable:  false,
	
	editor: new Ext.form.TextField()
},{
	id:        'Strip',
	header:    'Strip',
	dataIndex: 'Strip',
	sortable:  false,
	
	editor: new Ext.form.TextField()
}];









Ext.apply(Ext.form.VTypes, {
	MAC: function (value, field) {
		return value.match(/^[A-Fa-f0-9]{12}$/);
	},
	MACText: 'The MAC must be 0-9, A-F, 12 characters',
	
	CSR: function (value, field) {
		return ((value.startsWith('H') && value.length == 7) || value == 'N/A');
	},
	CSRText: 'The CSR field may be "N/A" or be a valid CSR reference number (HE#####)',
	
	// urpl testing begin
	primaryUse: function (value, field) {
		return value.length >= 2;
	},
	primaryUseText: 'You must specify a primary use',
	// urpl testing end
	
	firstName: function (value, field) {
		return value.length >= 2;
	},
	firstNameText: 'The first name may not be blank',
	
	lastName:  function (value, field) {
		return value.length >= 2;
	},
	lastNameText:  'The last name may not be blank',
	
	building: function (value, field) {
		return value.length == 2;
	},
	buildingText: 'You must specify a building',
	
	room: function (value, field) {
		return value.length > 0;
	},
	roomText:     'You must specify a room'
});

// Deployment Fields (for the tab)
var fieldDeployments = [{
	fieldLabel:    'CSR',
	width:         200,
	name:          'CSR',
	emptyText:     'HE##### or N/A',
	xtype:         'textfield',
	vtype:         'CSR',
	allowBlank:    false
},{
	fieldLabel:    'Deployed By', 
	width:         200, 
	name:          'Assigned_To', 
	xtype:         'combo',
	disabled:      true, // by default, disabled
	value:         Inventory.UserName,
	readOnly:      true,
	xtype:         'combo',
	store:         storeUsers,
	mode:          'remote',
	displayField:  'UserName',
	valueField:    'UserName', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{UserName}" class="x-combo-list-item">{UserName} </div></tpl>'
},{
	fieldLabel: 'Deploy Date', 
	width:      200, 
	name:       'Effective_Date',
	value:      new Date(),
	readOnly:   true,
	xtype:      'datefield',
	format:     'Y-m-d'
},{
	fieldLabel:    'Primary Use', 
	width:         200, 
	name:          'Primary_Use', 
	readOnly:      true,
	store:         storePrimaryUse,
	xtype:         'combo',
	mode:          'remote',
	displayField:  'Primary_Use',
	valueField:    'Primary_Use', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Primary_Use}" class="x-combo-list-item">{Primary_Use}</div></tpl>'
	// urpl testing
	// vtype:        'primaryUse',
	// allowBlank:    false
},{
	fieldLabel: 'First Name', 
	width:      200,
	name:       'First_Name',
	vtype:      'firstName',
	allowBlank: false
},{
	fieldLabel: 'Last Name', 
	width:      200, 
	name:       'Last_Name',
	vtype:      'lastName',
	allowBlank: false
},{
	fieldLabel:    'Building', 
	width:         200, 
	name:          'Building', 
	readOnly:      true,
	store:         storeBuildings,
	xtype:         'combo',
	mode:          'remote',
	displayField:  'BuildingCode',
	valueField:    'BuildingCode', 
	triggerAction: 'all',
	tpl: '<tpl for="."><div ext:qtip="{Name} ({BuildingCode})" class="x-combo-list-item">{Name} ({BuildingCode})</div></tpl>',
	vtype:         'building',
	allowBlank:    false
},{
	fieldLabel: 'Room', 
	width:      200, 
	name:       'Room',
	vtype:      'room',
	allowBlank: false
},{
	//fieldLabel: 'Position', 
	//width:      200, 
	//name:       'Location'
	fieldLabel: 'Location',
        width:      200,
        name:       'Location',
        readOnly:     true,
        xtype:        'combo',
        store:        storeLocations,
        mode:         'remote',
        displayField: 'Position',
        valueField:   'Position',
        triggerAction: 'all',
        tpl: '<tpl for="."><div ext:qtip="{Position}" class="x-combo-list-item">{Position}</div></tpl>'

},{
	fieldLabel:    'Mark As DNR', 
	width:         200, 
	name:          'DNR', 
	readOnly:      true,
	store:         new Ext.data.ArrayStore({
	        id: 0,
	        fields: [
	            'id',
	            'displayText'
	        ],
	        data: [[1, '1'], [0, '0']]
	    }),
	xtype:         'combo',
	value: 0,
	mode: 'local',
	displayField:  'displayText',
	valueField:    'id', 
	triggerAction: 'all',
	//tpl: '<tpl for="."><div ext:qtip="{displayText} (Value of {id})" class="x-combo-list-item">{displayText} (Value of {id})</div></tpl>',
	allowBlank:    false
}];

var storeDeployments = new Ext.data.JsonStore({
	url:        'data.php',
	root:       'results',
	idProperty: 'UserName',
	fields: ['Assigned_To', 'Primary_Use', 'Effective_Date', 'First_Name', 'Last_Name', 'Building', 'Room', 'Location'],
	
	baseParams: {
		table: 'Users'
	}
});


