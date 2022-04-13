import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState } from 'react';
import { Ingredient } from '../models/Ingredient';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipableCarousel({ ingredients }: any) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = ingredients.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography variant="h3" component="h2">{ingredients[activeStep]?.title}</Typography>
                <Typography className="hideScrollBar" sx={{
                    height: 50,
                    overflowY: 'scroll'
                }}>{ingredients[activeStep]?.description}</Typography>
            </Paper>

            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {ingredients.map((ingredient: Ingredient, index: any) => (
                    <div key={ingredient.id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    height: 200,
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                                src={ingredient.thumbnail}
                                alt={ingredient.description}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default SwipableCarousel;