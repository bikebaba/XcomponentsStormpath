/**
 * Created by bhuvanapalli on 11/19/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { toggleExpandedForAll } from './indexSortable';
import styles from './stylesheets/app.scss';
import { UserProfileForm } from 'react-stormpath';

const maxDepth = 6;

export default class BuilderPage extends Component {
    constructor(props) {
        super(props);

        //const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;
        console.log("App");
        this.state = {
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            treeData: [
                {
                    title: 'VPC',
                    subtitle: 'The main VPC',
                    expanded: true,
                    children: [
                        {
                            title: 'Subnet',
                            subtitle: 'Subnet (private)',
                        },
                        {
                            title: 'Subnet',
                            subtitle: (
                                <span>
                                    The tree uses&nbsp;
                                    <a href="https://github.com/bvaughn/react-virtualized">
                                        react-virtualized
                                    </a>
                                    &nbsp;and the relationship lines are more of a visual trick.
                                </span>
                            ),
                        },
                    ],
                },
                /*
                 {
                 expanded: true,
                 title: 'Any node can be the parent or child of any other node',
                 children: [
                 {
                 expanded: true,
                 title: 'Chicken',
                 children: [
                 { title: 'Egg' },
                 ],
                 },
                 ],
                 },
                 {
                 title: 'Button(s) can be added to the node',
                 subtitle: 'Node info is passed when generating so you can use it in your onClick handler',
                 },
                 {
                 title: 'Show node children by setting `expanded`',
                 subtitle: ({ node }) => `expanded: ${node.expanded ? 'true' : 'false'}`,
                 children: [
                 {
                 title: 'Bruce',
                 subtitle: ({ node }) => `expanded: ${node.expanded ? 'true' : 'false'}`,
                 children: [
                 { title: 'Bruce Jr.' },
                 { title: 'Brucette' },
                 ],
                 },
                 ],
                 },
                 {
                 title: 'Advanced',
                 subtitle: 'Settings, behavior, etc.',
                 children: [
                 {
                 title: (
                 <div>
                 <div
                 style={{
                 backgroundColor: 'gray',
                 display: 'inline-block',
                 borderRadius: 10,
                 color: '#FFF',
                 padding: '0 5px',
                 }}
                 >
                 Any Component
                 </div>

                 &nbsp;can be used for `title`
                 </div>
                 ),
                 },
                 {
                 expanded: true,
                 title: 'Limit nesting with `maxDepth`',
                 subtitle: `It's set to ${maxDepth} for this example`,
                 children: [
                 {
                 expanded: true,
                 title: renderDepthTitle,
                 children: [
                 {
                 expanded: true,
                 title: renderDepthTitle,
                 children: [
                 { title: renderDepthTitle },
                 {
                 title: ({ path }) => (path.length >= maxDepth ?
                 'This cannot be dragged deeper' :
                 'This can be dragged deeper'
                 ),
                 },
                 ],
                 },
                 ],
                 },
                 ],
                 },
                 {
                 title: 'When node contents are really long, it will cause a horizontal scrollbar' +
                 ' to appear. Deeply nested elements will also trigger the scrollbar.',
                 },
                 ],
                 },
                 */
            ],
        };

        this.updateTreeData = this.updateTreeData.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.addVPC = this.addVPC.bind(this);
        this.addSubnet = this.addSubnet.bind(this);
    }

    updateTreeData(treeData) {
        this.setState({ treeData });
    }

    expand(expanded) {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    }

    expandAll() {
        this.expand(true);
    }

    collapseAll() {
        this.expand(false);
    }

    addVPC() {
        //  this.
        const localTreeData = this.state.treeData;
        localTreeData[localTreeData.length] = {title: 'VPC', subtitle : 'Another VPC'};


        console.log(localTreeData);
        this.setState( {treeData: toggleExpandedForAll({
            treeData: localTreeData
        })} );
    }


    addSubnet() {
        //this.
        var localTreeData = this.state.treeData
        localTreeData[localTreeData.length] = {title : "Subnet", subtitle : "Another Subnet"};


        console.log(localTreeData);
        this.setState( {treeData: toggleExpandedForAll({
            treeData: localTreeData
        })} );
    }

    render() {
        const projectName = 'Component Builder';
        const authorName = 'Shiv Bhuvanapalli';

        console.log("render");

        const {
            treeData,
            searchString,
            searchFocusIndex,
            searchFoundCount,
        } = this.state;

        const alertNodeInfo = ({
            node,
            path,
            treeIndex,
            lowerSiblingCounts: _lowerSiblingCounts,
        }) => {
            const objectString = Object.keys(node)
                .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
                .join(`,\n   `);

            alert( // eslint-disable-line no-alert
                `Info passed to the button generator:\n\n` +
                `node: {\n   ${objectString}\n},\n` +
                `path: [${path.join(', ')}],\n` +
                `treeIndex: ${treeIndex}`
            );
        };

        const selectPrevMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) :
            searchFoundCount - 1,
        });

        const selectNextMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFocusIndex + 1) % searchFoundCount) :
                0,
        });

        return (
            <div>
                <section className={styles['page-header']}>
                    <h3 className={styles['project-name']}>{projectName}</h3>

                    <h3 className={styles['project-tagline']}>
                        Build Your Oteemo-X Pipeline here
                    </h3>
                </section>

                <section className={styles['main-content']}>
                    <button onClick={this.expandAll}>
                        Expand All
                    </button>

                    <button onClick={this.collapseAll}>
                        Collapse All
                    </button>



                    <button onClick={this.addVPC}>
                        Add VPC
                    </button>

                    <button onClick={this.addSubnet}>
                        Add Subnet
                    </button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <form
                        style={{ display: 'inline-block' }}
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <label htmlFor="find-box">
                            Search:&nbsp;

                            <input
                                id="find-box"
                                type="text"
                                value={searchString}
                                onChange={event => this.setState({ searchString: event.target.value })}
                            />
                        </label>

                        <button
                            type="button"
                            disabled={!searchFoundCount}
                            onClick={selectPrevMatch}
                        >
                            &lt;
                        </button>

                        <button
                            type="submit"
                            disabled={!searchFoundCount}
                            onClick={selectNextMatch}
                        >
                            &gt;
                        </button>

                        <span>
                            &nbsp;
                            {searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}
                            &nbsp;/&nbsp;
                            {searchFoundCount || 0}
                        </span>
                    </form>
                    <div style={{ height: 450 }}>
                        <SortableTree
                            treeData={treeData}
                            onChange={this.updateTreeData}
                            maxDepth={maxDepth}
                            searchQuery={searchString}
                            searchFocusOffset={searchFocusIndex}
                            searchFinishCallback={matches =>
                                this.setState({
                                    searchFoundCount: matches.length,
                                    searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
                                })
                            }
                            generateNodeProps={rowInfo => ({
                                buttons: [
                                    <button
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        onClick={() => alertNodeInfo(rowInfo)}
                                    >
                                        ℹ
                                    </button>,
                                ],
                            })}
                        />
                    </div>

                </section>

            </div>
        );
    }
}

