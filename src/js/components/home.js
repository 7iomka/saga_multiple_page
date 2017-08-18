import React from "react";
import Search from "../components/search";
import ItemsList from "../containers/itemsListContainer";
import utils from "../common/utils";
import _ from "lodash";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleSearchText = this.handleSearchText.bind(this);
        this.searchData = this.searchData.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.items !== nextProps.items) {
            this.matchSearchData(nextProps);
        }
    }

    componentWillMount() {
        this.props.showDetailsFunction();
        this.state.data=this.props.items;
    }

    clearData() {
        this.props.clearSearchTextFunction();
    }

    matchSearchData(props) {
        let dataToRender = [];
        let searchString = props.searchText.toUpperCase();
        if(searchString!=="") {
            _.map(props.items, (items, index) => {
                let description = props.items[index]["description"].toUpperCase();
                let name = props.items[index]["name"].toUpperCase();
                let id = props.items[index]["id"].toUpperCase();
                if (description.indexOf(searchString) >= 0 || name.indexOf(searchString) >= 0 || id.indexOf(searchString) >= 0) {
                    dataToRender.push(this.props.items[index]);
                }
            });
        }
        this.setState({
            data: dataToRender
        });
       this.props.showSearchedDetailsFunction(dataToRender);
    }

    handleSearchText(event) {
        let value = event.target.value;
        this.props.handleSearchText(value);
    }

    searchData() {
        this.matchSearchData(this.props);
        if (this.props.searchText) {
            window.location.href = utils.searchPath + this.props.searchText;
        } else {
            console.log("search box empty");
        }
    }

    render() {
        return (
            <div className="bg-detail">
                <Search clearData={this.clearData} searchText={this.props.searchText}
                        handleSearchText={this.handleSearchText} searchData={this.searchData}/>
                {this.props.items.length ?
                    <ItemsList searchText={this.props.searchText} /> :
                    <div className="no-result">No Result Found , Search Again</div>}
            </div>
        );
    }
}


export default (Home);