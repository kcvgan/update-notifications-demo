import { useState, useEffect } from 'react';
import { getAppUpdates } from './appUpdateService';

const DEFAULT_INTERVAL = 1800000; // 30 minutes

// Config object provides sensible defaults
// By default:
// 1. We want to stop checking for updates after an update has been found
// 2. We want to disable the interval from the get go if we want to manually check for updates
//    using the returned function
// 3. We want to customize the interval but have it default at 30 mins (to be tweaked of course)
export const useAppUpdates = ({ interval = DEFAULT_INTERVAL, disableInterval = false, stopOnUpdateAvailable = true }) => {
    const [updates, setUpdates] = useState({ isNewVersionAvailable: false, currentVersion: null, latestVersion: null });
    const [disabled, setDisabled] = useState(disableInterval)

    const stopChecking = () => setDisabled(true);

    useEffect(() => {
        let timer;

        if(!disabled) {
            timer = setInterval(async () => {
                const updates = await getAppUpdates();

                setUpdates(updates);
            }, interval);

        }

        return () => clearInterval(timer);
    }, [disabled, interval]);

    useEffect(() => {
        if(stopOnUpdateAvailable && updates.isNewVersionAvailable) {
            stopChecking();
        }
    }, [stopOnUpdateAvailable, updates] )

    return {
        ...updates,
        stopChecking,
        getAppUpdates
    }
}
