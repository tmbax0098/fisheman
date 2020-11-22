import React from 'react';
import RBSheet from "react-native-raw-bottom-sheet";

export default function AlertSheet({component, onClose, height = 300, refSheet = null}) {

    return (
        <RBSheet
            ref={refSheet}
            height={height}
            openDuration={250}
            closeDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={false}
            onClose={onClose}
            customStyles={{
                container: {
                    // justifyContent: "center",
                    alignItems: "center"
                }
            }}
        >
            {component}
        </RBSheet>
    );
};
