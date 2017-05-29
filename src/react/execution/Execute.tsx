import * as React from 'react';
import isEqual = require('lodash/isEqual');

import { IAfm } from '../../interfaces/Afm';
import { ITransformation } from '../../interfaces/Transformation';
import { IDataTable } from '../../interfaces/DataTable';
import { DataTable } from '../../DataTable';
import { SimpleExecutorAdapter } from '../../adapters/SimpleExecutorAdapter';
import { ISimpleExecutorResult } from '../../Interfaces';
import {
    DATA_TOO_LARGE_TO_COMPUTE,
    BAD_REQUEST,
    UNKNOWN_ERROR,
    NO_DATA
} from '../wrappers/errorStates';

export interface IExecuteProps {
    afm: IAfm;
    transformation?: ITransformation;
    projectId: string;
    // TODO: Use proper interface
    onExecute: (result: Object) => void;
    onError: (error: Object) => void;
    onLoading: (state: boolean) => void;
    dataTableFactory?: IDataTableFactory;
    className?: string;
}

export type IDataTableFactory = (projectId: string) => IDataTable;

function execute(dataTable: IDataTable, afm: IAfm, transformation: ITransformation = {}): Promise<Object> {
    return dataTable.execute(afm, transformation);
}

function dataTableFactory(projectId): IDataTable {
    const adapter = new SimpleExecutorAdapter(projectId);
    return new DataTable(adapter);
}

export class Execute extends React.Component<IExecuteProps, undefined> {

    public static defaultProps: Partial<IExecuteProps> = {
        dataTableFactory
    };

    private dataTable: IDataTable;

    public constructor(props) {
        super(props);

        this.dataTable = props.dataTableFactory(props.projectId);
    }

    public componentDidMount() {
        this.runExecution(this.props);
    }

    public componentWillReceiveProps(nextProps) {
        if (this.hasPropsChanged(nextProps, ['afm', 'transformation'])) {
            this.runExecution(nextProps);
        }
    }

    public shouldComponentUpdate(nextProps) {
        return this.hasPropsChanged(nextProps, ['afm', 'transformation', 'children']);
    }

    public render() {
        return (
            <span className={this.props.className}>{this.props.children}</span>
        );
    }

    private isPropChanged(nextProps, propName) {
        if (propName === 'children') {
            return nextProps.children !== this.props.children;
        }

        return !isEqual(nextProps[propName], this.props[propName]);
    }

    private hasPropsChanged(nextProps, propNames) {
        return propNames.some((propName) => this.isPropChanged(nextProps, propName));
    }

    private runExecution(props) {
        const { afm, transformation, onExecute, onError, onLoading } = props;

        this.props.onLoading(true);

        execute(this.dataTable, afm, transformation)
            .then((data) => {
                if ((data as ISimpleExecutorResult).isEmpty) {
                    onError({ status: NO_DATA });
                } else {
                    onExecute(data);
                }
            })
            .catch((error) => {
                if (error.response.status === 413) {
                    return onError({ status: DATA_TOO_LARGE_TO_COMPUTE, error });
                }
                if (error.response.status === 400) {
                    return onError({ status: BAD_REQUEST, error });
                }
                onError({ status: UNKNOWN_ERROR, error });
            })
            .then(() => onLoading(false));
    };
}