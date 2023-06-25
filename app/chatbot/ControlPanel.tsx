import { Box, Grid, styled } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import SelectBar from '../components/SelectBar';

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
    'Message History',
    'Create your own Personality',
    'Command',
    'Statistics',
    'Directions',
  ]);

  const draggedIndexRef = useRef<number | null>(null);
  const hoverIndexRef = useRef<number | null>(null);
  const activeToggle = 'Your Chatbot is Online! Give chad  a command in your twitch channel'

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
          >
            <DraggableBox
              sx={{
                backgroundColor: item === 'Toggle' ? '' : '#e2e2e2',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: item === 'Toggle' ? '' : '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              { item === 'Toggle' ? <ToggleSwitch activeToggle={activeToggle}/> : item === "Select" ? <SelectBar /> : item}
            </DraggableBox>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ControlPanel;