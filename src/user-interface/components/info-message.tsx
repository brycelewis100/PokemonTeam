import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, LinearProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Player } from '../../types';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface MessageProps {
  open: boolean;
  full: boolean;
  players: Player[];
  handleClose: () => void;
  messageData: {
    name: string;
    stats: {
      name: string;
      level: number;
    }[];
    sprite: string;
  };
  selectPlayer: (name: string, sprite: string, players: Player[]) => void;
}

const InfoMessage: React.FC<MessageProps> = ({
  open,
  handleClose,
  messageData,
  selectPlayer,
  full,
  players,
}) => {
  // const players = useTypedSelector((state) => state.data.players);

  const name =
    messageData.name.charAt(0).toUpperCase() + messageData.name.slice(1);

  const onClick = () => {
    selectPlayer(name, messageData.sprite, players);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ paddingBottom: 20 }}
            >
              {name}
            </Typography>

            {!full && (
              <Button
                variant="contained"
                color="success"
                onClick={() => onClick()}
              >
                Select
              </Button>
            )}
          </Box>

          <Box>
            <img style={{ width: '50%' }} src={messageData.sprite}></img>
          </Box>

          {messageData.stats.map((stat) => {
            return (
              <Box
                key={stat.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2px',
                }}
              >
                <Box sx={{ width: '100%', mr: 1, height: 50 }}>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body1" color="text.secondary">{`${
                      stat.name
                    } : ${Math.round(stat.level)}`}</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={stat.level} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default InfoMessage;
