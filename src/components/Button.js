import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function GroupedButtons() {
    return (
        <Grid item xs={12} md={6}>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item>
                    <ButtonGroup
                        variant="contained"
                        color="secondary"
                        size="large"
                        aria-label="large contained secondary button group"
                    >
                        <Button>AAAAAAAA</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    );
}