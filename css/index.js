//CCRS Family Info template
//by James

//for the purposes of generating guided pages for CCRS image upload
//generates blank boxes to paste in images based on number of SSNs
//-----------------------------

//SSN input
class FamilyMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childNum: '',
      guardianNum: '',
      guardianTwoNum: '',
      extraNums: [],
      familyNums: [],
      guardianTwoExists: false,
      guardianButtonValue: "Add 2nd Guardian",
      otherButtValue: "Add Other Documents",
      otherExists: false };


  }
  //generate additional SSN input fields based on array length
  createInputs() {
    return this.state.extraNums.map((el, i) =>
    React.createElement("div", { key: i },
    React.createElement("input", { type: "text", value: el || '', placeholder: "Family Member SSN", onChange: this.handleChange.bind(this, i) }),
    React.createElement("input", { type: "button", value: "Remove", onClick: this.removeClick.bind(this, i) })));


  }

  setGuardianTwo() {
    if (this.state.guardianButtonValue === "Remove 2nd Guardian") {this.setState({ guardianButtonValue: "Add 2nd Guardian",
        guardianTwoExists: false,
        guardianTwoNum: '' });} else
    {this.setState({ guardianButtonValue: "Remove 2nd Guardian",
        guardianTwoExists: true });}

  }

  setOther() {//for adding supporting documents
    if (this.state.otherButtValue === "Remove Other Documents") {this.setState({ otherButtValue: "Add Other Documents",
        otherExists: false });} else
    {this.setState({ otherButtValue: "Remove Other Documents",
        otherExists: true });}

  }

  basicInputs() {//generate child and guardian fields
    if (this.state.guardianTwoExists) {
      return (
        React.createElement("div", { key: "defaultNums" },
        React.createElement("div", null,
        React.createElement("input", { type: "text", value: this.state.guardianNum, placeholder: "Guardian SSN", onChange: this.updateGuardian.bind(this) }),
        React.createElement("input", { type: "button", class: "smallButt", value: this.state.guardianButtonValue, onClick: this.setGuardianTwo.bind(this) })),

        React.createElement("div", null,
        React.createElement("input", { type: "text", value: this.state.guardianTwoNum, placeholder: "Guardian Two SSN", onChange: this.updateGuardianTwo.bind(this) })),

        React.createElement("div", null,
        React.createElement("input", { type: "text", value: this.state.childNum, placeholder: "Case Child SSN", onChange: this.updateChild.bind(this) }))));


    } else
    {
      return (
        React.createElement("div", { key: "defaultNums" },
        React.createElement("div", null,
        React.createElement("input", { type: "text", value: this.state.guardianNum, placeholder: "Guardian SSN", onChange: this.updateGuardian.bind(this) }),
        React.createElement("input", { type: "button", class: "smallButt", value: this.state.guardianButtonValue, onClick: this.setGuardianTwo.bind(this) })),

        React.createElement("div", null,
        React.createElement("input", { type: "text", value: this.state.childNum, placeholder: "Case Child SSN", onChange: this.updateChild.bind(this) }))));


    }
  }

  clearAll(event) {
    this.setState({
      childNum: '',
      guardianNum: '',
      guardianTwoNum: '',
      extraNums: [],
      familyNums: [],
      guardianTwoExists: false,
      guardianButtonValue: "Add 2nd Guardian",
      otherButtValue: "Add Other Documents",
      otherExists: false });

    location.reload(true);
  }

  //update default fields
  updateChild(event) {
    this.setState({ childNum: event.target.value });
  }
  updateGuardian(event) {
    this.setState({ guardianNum: event.target.value });
  }
  updateGuardianTwo(event) {
    this.setState({ guardianTwoNum: event.target.value });
  }

  //update additional fields
  handleChange(i, event) {
    let extraNums = [...this.state.extraNums];
    extraNums[i] = event.target.value;
    this.setState({ extraNums });
  }

  //adds empty value to array   
  addClick() {
    this.setState(prevState => ({ extraNums: [...prevState.extraNums, ''] }));
  }

  //removes value from array  
  removeClick(i) {
    let extraNums = [...this.state.extraNums];
    extraNums.splice(i, 1);
    this.setState({ extraNums });
  }

  //grabs list of SSNs from form  
  getSSN(event) {
    //alert('Yay this works up to here');
    let nums = [this.state.guardianNum, this.state.childNum, ...this.state.extraNums];
    if (this.state.guardianTwoNum) {nums = [this.state.guardianNum, this.state.guardianTwoNum, this.state.childNum, ...this.state.extraNums];}

    this.setState({
      familyNums: [...nums] });

    event.preventDefault();
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "menu" },
      React.createElement("div", { id: "inputs" },
      React.createElement("form", null,
      this.basicInputs(),
      this.createInputs(),
      React.createElement("input", { class: "bigButt", type: "button", value: "Add More Family Members", onClick: this.addClick.bind(this) }),
      React.createElement("input", { class: "bigButt", type: "button", value: "Generate SSI/SSA Pages", onClick: this.getSSN.bind(this) }),
      React.createElement("input", { class: "bigButt", type: "button", value: this.state.otherButtValue, onClick: this.setOther.bind(this) }),
      React.createElement("input", { class: "bigButt2", type: "button", value: "Clear All Values", onClick: this.clearAll.bind(this) }))),


      React.createElement("div", { id: "reset" })),


      React.createElement(ImagePaste, { guardNum: this.state.guardianNum, guardTwoNum: this.state.guardianTwoNum, guardTwoExists: this.state.guardianTwoExists, familyNums: this.state.familyNums, otherExists: this.state.otherExists })));



  }}



//creates additional image upload boxes  
class AddPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extraPages: [] };

  }
  createPages() {
    return this.state.extraPages.map((el, i) =>
    React.createElement("div", { key: i },
    React.createElement("div", { class: "imgpaste" }),
    React.createElement("input", { type: "button", value: "Remove", onClick: this.removeClick.bind(this, i) })));


  }

  //button functions for adding and removing boxes                                      
  addClick() {
    this.setState(prevState => ({ extraPages: [...prevState.extraPages, ''] }));
  }

  removeClick(i) {
    let extraPages = [...this.state.extraPages];
    extraPages.splice(i, 1);
    this.setState({ extraPages });
  }

  render() {
    return (
      React.createElement("div", null,
      this.createPages(),
      React.createElement("input", { class: "bigButt", type: "button", value: "Add more images", onClick: this.addClick.bind(this) })));



  }}


//image upload boxes
class ImagePaste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guardianTwoExists: false };

  }

  //creates additional AWVS and Child Support headers and image boxes if 2nd guardian exists
  checkGuardianTwo() {
    if (this.props.guardTwoExists) {
      return (
        React.createElement("div", null,
        React.createElement("h4", null, this.props.guardTwoNum),
        React.createElement("div", { class: "imgpaste" }),
        React.createElement(AddPages, null)));


    }
  }

  //adds extra boxes for other content
  checkOther() {
    if (this.props.otherExists) {
      return (
        React.createElement("div", null,
        React.createElement("h3", null, "Other Documents"),
        React.createElement("div", { class: "imgpaste" }),
        React.createElement(AddPages, null)));


    }
  }

  render() {
    //creates SSI/SSA pages
    const finalPages = this.props.familyNums.map(function (x) {
      return (
        React.createElement("div", null,
        React.createElement("h4", null, x),
        React.createElement("div", { class: "splitDiv" },
        React.createElement("div", { class: "imgpaste" }),
        React.createElement("div", { class: "imgpaste grid3" }))));



    });


    return (
      React.createElement("div", null,

      React.createElement("br", null),
      React.createElement("h3", null, " Basics "),
      React.createElement("div", { class: "imgpaste" }),
      React.createElement("h3", null, " Needs "),
      React.createElement("div", { class: "imgpaste" }),
      React.createElement("h3", null, " People "),
      React.createElement("div", { class: "imgpaste" }),
      React.createElement(AddPages, null),
      React.createElement("h3", null, " AWVS "),
      React.createElement("h4", null, " ", this.props.guardNum, " "),
      React.createElement("div", { class: "imgpaste" }),
      React.createElement(AddPages, null),
      this.checkGuardianTwo(),
      React.createElement("h3", null, " Child Support "),
      React.createElement("h4", null, " ", this.props.guardNum, " "),
      React.createElement("div", { class: "imgpaste" }),
      React.createElement(AddPages, null),
      this.checkGuardianTwo(),
      React.createElement("h3", null, " SSI/SSA "),
      finalPages,
      this.checkOther()));


  }}


//imagepaste jquery

// Created by STRd6
// modded by James
// MIT License
// jquery.paste_image_reader.js
(function ($) {
  var defaults;
  $.event.fix = function (originalFix) {
    return function (event) {
      event = originalFix.apply(this, arguments);
      if (event.type.indexOf("copy") === 0 || event.type.indexOf("paste") === 0) {
        event.clipboardData = event.originalEvent.clipboardData;
      }
      return event;
    };
  }($.event.fix);
  defaults = {
    callback: $.noop,
    matchType: /image.*/ };

  return $.fn.pasteImageReader = function (options) {
    if (typeof options === "function") {
      options = {
        callback: options };

    }
    options = $.extend({}, defaults, options);
    return this.each(function () {
      var $this, element;
      element = this;
      $this = $(this);
      return $this.bind("paste", function (event) {
        var clipboardData, found;
        found = false;
        clipboardData = event.clipboardData;
        return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
          var file, reader;
          if (found) {
            return;
          }
          if (
          type.match(options.matchType) ||
          clipboardData.items[i].type.match(options.matchType))
          {
            file = clipboardData.items[i].getAsFile();
            reader = new FileReader();
            reader.onload = function (evt) {
              return options.callback.call(element, {
                dataURL: evt.target.result,
                event: evt,
                file: file,
                name: file.name });

            };
            reader.readAsDataURL(file);
            snapshoot();
            return found = true;
          }
        });
      });
    });
  };
})(jQuery);

var dataURL, filename;
$("html").pasteImageReader(function (results) {
  filename = results.filename, dataURL = results.dataURL;
  $data.text(dataURL);
  $size.val(results.file.size);
  $type.val(results.file.type);
  var img = document.createElement("img");
  img.src = dataURL;
  var w = img.width;
  var h = img.height;
  $width.val(w);
  $height.val(h);

  $(".active").addClass("pasted");
  $(".active").empty();
  return $(".active").append('<img src="' + dataURL + '"/>')
  /*.css({
                                                             	backgroundImage: "url(" + dataURL + ")"
                                                             })*/.
  data({ width: w, height: h });
});

var $data, $size, $type, $width, $height;
$(function () {
  $data = $(".data");
  $size = $(".size");
  $type = $(".type");
  $width = $("#width");
  $height = $("#height");
  $(document).on("click", ".imgpaste", function () {
    var $this = $(this);
    var bi = $this.css("background-image");
    if (bi != "none") {
      $data.text(bi.substr(4, bi.length - 6));
    }

    $(".active").removeClass("active"); //unactivates
    $this.addClass("active"); //activates current div

    $width.val($this.data("width"));
    $height.val($this.data("height"));

    $this.css({ width: "", height: "", "z-index": "" });

  });
});

//end jquery


ReactDOM.render(React.createElement(FamilyMembers, null), document.getElementById('App'));