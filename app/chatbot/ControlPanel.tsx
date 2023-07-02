import { Box, Grid, styled } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import ToggleComponent from './components/ToggleComponent';
import SelectPersonalityComponent from './components/SelectPersonalityComponent';
import HistoryComponent from './components/HistoryComponent';
import CreatePersonalityComponent from './components/CreatePersonalityComponent';
import CommandComponent from './components/CommandComponent';
import StatisticsComponent from './components/StatisticsComponent';
import DirectionsComponent from './components/DirectionsComponent';

const DraggableBox = styled(Box)(() => ({
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
}));

const ControlPanel = () => {
  const [items, setItems] = useState<string[]>([
    'Toggle',
    'Select',
    'History',
    'Create',
    'Command',
    'Statistics',
    'Directions',
  ]);

  const draggedIndexRef = useRef<number | null>(null);
  const hoverIndexRef = useRef<number | null>(null);

  const handleDragStart = (index: number) => () => {
    draggedIndexRef.current = index;
  };

  const handleDragOver = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    hoverIndexRef.current = index;
  };

  const handleDrop = (index: number) => () => {
    if (draggedIndexRef.current !== null && draggedIndexRef.current !== index) {
      const reorderedItems = [...items];
      const [draggedItem] = reorderedItems.splice(draggedIndexRef.current, 1);
      reorderedItems.splice(index, 0, draggedItem);
      setItems(reorderedItems);
    }
    draggedIndexRef.current = null;
    hoverIndexRef.current = null;
  };

  useEffect(() => {
    const handleDragEnd = () => {
      draggedIndexRef.current = null;
      hoverIndexRef.current = null;
    };

    document.addEventListener('dragend', handleDragEnd);

    return () => {
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  const dynamicComponent = (item: string) => {
    switch (item) {
      case 'Toggle':
        return <ToggleComponent/>
      case 'Select':
        return <SelectPersonalityComponent />
      case 'History':
        return <HistoryComponent />
      case 'Create':
        return <CreatePersonalityComponent />
      case 'Command':
        return <CommandComponent />
      case 'Statistics':
        return <StatisticsComponent />
      case 'Directions':
        return <DirectionsComponent />
      default:
        return item;
    }
  }

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={6} sm={6} md={6} key={item}>
          <div
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
            className={`draggable-box${draggedIndexRef.current === index ? ' dragging' : ''}${
              hoverIndexRef.current === index ? ' hovering' : ''
            }`}
            style={{ breakInside: 'avoid-column' }}
          >
            <DraggableBox
              sx={{
                color: 'black',
                backgroundColor: item === 'Toggle' ? '' : '#e2e2e2',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: item === 'Toggle' ? '' : '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {dynamicComponent(item)}
            </DraggableBox>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ControlPanel;