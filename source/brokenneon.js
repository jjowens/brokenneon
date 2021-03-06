var brokenneon = (function()
{
    function ToggleLights() {
        var _lightElements = undefined;
        var _toggleFlag = undefined;
        var _elementsLength = 0;
        var _whitelist = [];
        var _timer = undefined;
        var _max = 0;
        var _stopInterval = false;
        var _lightsOnOpacity = 1;
        var _lightsOffOpacity = 0;
        var _individualFlag = true;

        // TOGGLE YOUR LIGHTS ON OR OFF. SET INDIVIDUAL FLAG TO TRUE TO SWITCH OFF LIGHTS ONE BY ONE. FLASE TO SWITCH OFF ALL AT SAME TIME.
        function Toggle(elementClass, toggleFlag, individualFlag, lightsOnOpacity, lightsOffOpacity, interval) {
            _lightElements = document.getElementsByClassName(elementClass);

            if (_lightElements) {
                _elementsLength = _lightElements.length;
                _max = _lightElements.length - 1;
                _toggleFlag = toggleFlag;
                _individualFlag = individualFlag;
                _lightsOffOpacity = lightsOffOpacity;
                _lightsOnOpacity = lightsOnOpacity;

                if (_individualFlag) {
                    _timer = setInterval(toggleElements, interval)
                } else {
                    toggleAll()
                }

            } else {
                console.log('No light elements found');
            }
        }

        // TOGGLE LIGHTS ONE BY ONE
        function toggleElements() {
            if (_stopInterval) {
                console.log('timer is switched off');
                return;
            }

            if (!_lightElements) {
                console.log('No lights element available. Exiting');
                return;
            }

            var minimum = 0;
            var elementIdx = -1;
            var found = false;

            var currentOpacity = _lightsOffOpacity;

            if (_toggleFlag) {
                currentOpacity = _lightsOnOpacity;
            }

            // GET RANDOM ELEMENTS
            while(!found) {
                elementIdx = Math.floor(Math.random() * (_max - minimum + 1)) + minimum;

                if (!_whitelist.includes(elementIdx)) {
                    _whitelist.push(elementIdx);
                    found = true;
                }
            }

            _lightElements[elementIdx].style.opacity = currentOpacity;

            // STOP TIMER IF WE HAVE SET OPACITY FOR ALL LIGHT ELEMENTS
            if (_whitelist.length === _elementsLength) {
                clearInterval(_timer);
                _stopInterval = true;
            }

        }

        // TOGGLE ALL LIGHTS
        function toggleAll() {
            if (!_lightElements) {
                console.log('No lights element available. Exiting');
                return;
            }

            var currentOpacity = _lightsOffOpacity;

            if (_toggleFlag) {
                currentOpacity = _lightsOnOpacity;
            }

            for (var i=0; i < _lightElements.length; i++) {
                _lightElements[i].style.opacity = currentOpacity;
            }

        }

        return {
            Toggle: Toggle
        }

    }

    function ToggleGradual() {
        var _lightElements = undefined;
        var _toggleFlag = undefined;
        var _elementsLength = 0;
        var _whitelist = [];
        var _timer = undefined;
        var _maxLength = 0;
        var _stopInterval = false;
        var _lightsOnOpacity = 1;
        var _lightsOffOpacity = 0;
        var _currentIdx = 0;
        var _resetFlag = false;

        // TOGGLE YOUR LIGHTS ON OR OFF. SET INDIVIDUAL FLAG TO TRUE TO SWITCH OFF LIGHTS ONE BY ONE. FLASE TO SWITCH OFF ALL AT SAME TIME.
        function Toggle(elementClass, toggleFlag, lightsOnOpacity, lightsOffOpacity, interval, resetFlag) {
            _lightElements = document.getElementsByClassName(elementClass);

            if (_lightElements) {
                _elementsLength = _lightElements.length;
                _maxLength = _lightElements.length - 1;
                _toggleFlag = toggleFlag;
                _lightsOffOpacity = lightsOffOpacity;
                _lightsOnOpacity = lightsOnOpacity;
                _resetFlag = resetFlag;

                _timer = setInterval(toggleElements, interval);

            } else {
                console.log('No light elements found');
            }
        }

        function hideAllElements() {
            if (!_lightElements) {
                console.log('Exit process');
                return;
            }

            for (var i=0; i < _lightElements.length; i++) {
                _lightElements[i].style.opacity = _lightsOffOpacity;
            }
        }

        // TOGGLE LIGHTS ONE BY ONE
        function toggleElements() {
            if (_stopInterval) {
                console.log('timer is switched off');
                return;
            }

            if (!_lightElements) {
                console.log('No lights element available. Exiting');
                return;
            }

            _lightElements[_currentIdx].style.opacity = 1;

            if (_currentIdx < _maxLength) {
                _currentIdx += 1;
            } else {

                if (_resetFlag) {
                    hideAllElements();
                    _currentIdx = 0;
                } else {
                    clearInterval(_timer);
                    console.log('Stopped timer');
                }
            }

        }

        return {
            Toggle: Toggle
        }

    }

    function FlickerBroken() {
        var _lightElements = undefined;
        var _min = 0;
        var _max = 0.09;
        var _opacity = 0.25;
        var _opacityDegrees = 0.1;
        var _toggle = 'fadeout';

        function StartFlickering(elementClass, min, max, interval) {
            _lightElements = document.getElementsByClassName(elementClass);

            if (_lightElements) {
                _min = min;
                _max = max;

                setInterval(flickerElements, interval)
            } else {
                console.log('No light elements found');
            }
        }

        function flickerElements() {
            if (!_lightElements) {
                console.log('Exit process');
                return;
            }

            for (index=0; index < _lightElements.length; index++) {
                _lightElements[index].style.opacity = _opacity;
                console.log('Element ' + index + ' Opacity ' + _opacity);
            }

            if (_toggle === 'fadeout') {
                _opacity = _min;
                _toggle = 'fadein'
            } else {
                _opacity = _max;

                _toggle = 'fadeout'
            }

            console.log('toggled to ' + _toggle);
        }

        return {
            StartFlickering: StartFlickering
        }

    }

    function RandomFlicker() {
        var _lightElements = undefined;
        var _opacityArray = undefined;
        var _opacityIdx = 0;
        var _maxLength = 0;

        var _elementsLength = 0;

        function StartFlickering(elementClass, opacityArray, interval) {
            _lightElements = document.getElementsByClassName(elementClass);

            if (_lightElements) {
                _elementsLength = _lightElements.length - 1;
                _opacityArray = opacityArray;
                _maxLength = opacityArray.length - 1;

                setInterval(flickerElements, interval)
            } else {
                console.log('No Light Elements found');
            }
        }

        function flickerElements() {
            if (!_lightElements) {
                console.log('Exit process');
                return;
            }

            if (!_opacityArray) {
                console.log('No Opacity array available');
                return;
            }

            var minimum = 0;

            var elementIdx = Math.floor(Math.random() * (_elementsLength - minimum + 1)) + minimum;
            var currentOpacity = _opacityArray[_opacityIdx];

            _lightElements[elementIdx].style.opacity = currentOpacity

            if (_opacityIdx < _maxLength) {
                _opacityIdx += 1;
            } else {
                _opacityIdx = 0;
            }
        }

        return {
            StartFlickering: StartFlickering
        }

    }
    
    function NeonBuilder() {
        var _lightElements;
        var _textshadowStyle;
        var _textshadowArray ;

        function Create(elementClass, textShadowStyle)
        {
            console.log('Creating started');

            _lightElements = document.getElementsByClassName(elementClass);

            if (_lightElements) {
                for (var i=0; i < _lightElements.length; i++)
                {
                    var lightObj = _lightElements[i];
                    lightObj.style.textShadow = textShadowStyle;
                }
            } else {
                console.log('No light elements found');
            }
        }

        function CreateWithShadowArray(elementClass, textShadowArray)
        {
            console.log('Creating with array started');
            _lightElements = document.getElementsByClassName(elementClass);
            _textshadowArray = textShadowArray;

            if (_lightElements) {
                UpdateWithShadowArray();
            } else {
                console.log('No light elements found');
            }
        }

        function AddTextShadow(textShadow)
        {
            if (!_textshadowArray) {
                return;
            }

            if (_textshadowArray.length >= 20) {
                console.log('textShadowArray has ' + _textshadowArray.length + " elements. That's more than enough, yeah? Exiting...");
                return;
            }

            if (textShadow) {
                _textshadowArray.push(textShadow);
                console.log('Added textShadow');
                UpdateWithShadowArray();
            }
        }

        function InsertTextShadow(textShadow, index)
        {
            if (!_textshadowArray) {
                return;
            }

            if (textShadow) {
                if (index > _textshadowArray.elements.length) {
                    return;
                }
                _textshadowArray.splice(index, 0, textShadow);
                UpdateWithShadowArray();
            }
        }

        function RemoveTextShadowByIndex(index)
        {
            if (!_textshadowArray) {
                return;
            }

            if (index >= 0) {
                if (index > _textshadowArray.length) {
                    return;
                }
                _textshadowArray.splice(index, 1);
                console.log('removed');
                UpdateWithShadowArray();
            }
        }

        function UpdateWithShadowArray()
        {
            var isAvailable = false;

            if (_textshadowArray) {
                if (_textshadowArray.length > 0) {
                    isAvailable = true;
                }
            }

            var shadowStyle = '';

            if (isAvailable)
            {
                shadowStyle = _textshadowArray.join();
            }

            for (var i=0; i < _lightElements.length; i++)
            {
                var lightObj = _lightElements[i];
                lightObj.style.textShadow = shadowStyle;
            }

        }


        function ClearAllShadows() {
            _textshadowArray = [];

            UpdateWithShadowArray();
        }

        return {
            Create: Create,
            CreateWithShadowArray: CreateWithShadowArray,
            AddTextShadow: AddTextShadow,
            InsertTextShadow: InsertTextShadow,
            RemoveTextShadowByIndex: RemoveTextShadowByIndex,
            ClearAllShadows: ClearAllShadows
        }

    }

    return {
        ToggleLights: ToggleLights,
        ToggleGradual: ToggleGradual,
        FlickerBroken: FlickerBroken,
        RandomFlicker: RandomFlicker,
        NeonBuilder: NeonBuilder
    }

});