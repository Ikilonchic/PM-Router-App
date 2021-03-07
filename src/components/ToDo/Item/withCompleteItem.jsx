import React from 'react';

import TodoApiService from '../../../services/TodoApiService';

function withCompleteItem(Item) {
    return class extends React.Component {
        constructor(props) {
            super(props);
    
            this.onComplete = this.onComplete.bind(this);
        }
    
        async onComplete() {
            const data = await TodoApiService.patchItem(this.props.id, {
                completed: !this.props.completed,
            });

            this.props.onComplete(this.props.id, data.completed);
        }

        render() {
            return <Item {...this.props} onComplete={this.onComplete}/>;
        }
    }
}

export default withCompleteItem;
