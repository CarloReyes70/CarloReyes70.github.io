function updateInputs() {
    const formula = document.getElementById('formula').value;
    const inputFields = document.getElementById('input-fields');
    const calculateButton = document.getElementById('calculate-button');
    inputFields.innerHTML = ''; // Limpiar campos de entrada previos
    calculateButton.style.display = 'none'; // Ocultar botón de calcular por defecto

    if (formula === 'calor') {
        inputFields.innerHTML = `
            <label for="mass">Masa (kg):</label>
            <input type="number" id="mass" placeholder="Masa en kg" required>
            
            <label for="initial-temp">Temperatura Inicial (°C):</label>
            <input type="number" id="initial-temp" placeholder="Temperatura inicial en °C" required>
            
            <label for="final-temp">Temperatura Final (°C):</label>
            <input type="number" id="final-temp" placeholder="Temperatura final en °C" required>
            
            <label for="specific-heat">Calor Específico del Agua (kcal/kg·°C):</label>
            <input type="number" id="specific-heat" placeholder="1 (kcal/kg·°C)" value="1" required>
            
            <label for="latent-heat-fusion">Calor Latente de Fusión (kcal/kg):</label>
            <input type="number" id="latent-heat-fusion" placeholder="80 (kcal/kg)" value="80" required>
            
            <label for="specific-heat-ice">Calor Específico del Hielo (kcal/kg·°C):</label>
            <input type="number" id="specific-heat-ice" placeholder="0.5 (kcal/kg·°C)" value="0.5" required>
        `;
    } else if (formula === 'cinematica') {
        inputFields.innerHTML = `
            <label for="initial-velocity">Velocidad Inicial (m/s):</label>
            <input type="number" id="initial-velocity" placeholder="Velocidad inicial en m/s" required>
            
            <label for="acceleration-cinematica">Aceleración (m/s²):</label>
            <input type="number" id="acceleration-cinematica" placeholder="Aceleración en m/s²" required>
            
            <label for="time-cinematica">Tiempo (s):</label>
            <input type="number" id="time-cinematica" placeholder="Tiempo en segundos" required>
        `;
    } else if (formula === 'dinamica') {
        inputFields.innerHTML = `
            <label for="mass-dinamic">Masa (kg):</label>
            <input type="number" id="mass-dinamic" placeholder="Masa en kg" required>
            
            <label for="acceleration">Aceleración (m/s²):</label>
            <input type="number" id="acceleration" placeholder="Aceleración en m/s²" required>
        `;
    } else if (formula === 'energia') {
        inputFields.innerHTML = `
            <label for="mass-energia">Masa (kg):</label>
            <input type="number" id="mass-energia" placeholder="Masa en kg" required>
            
            <label for="velocity-energia">Velocidad (m/s):</label>
            <input type="number" id="velocity-energia" placeholder="Velocidad en m/s" required>
        `;
    } else if (formula === 'mezcla') {
        inputFields.innerHTML = `
            <label for="mass1">Masa 1 (kg):</label>
            <input type="number" id="mass1" placeholder="Masa 1 en kg" required>
            
            <label for="temp1">Temperatura Inicial 1 (°C):</label>
            <input type="number" id="temp1" placeholder="Temperatura inicial de la primera sustancia" required>
            
            <label for="mass2">Masa 2 (kg):</label>
            <input type="number" id="mass2" placeholder="Masa 2 en kg" required>
            
            <label for="temp2">Temperatura Inicial 2 (°C):</label>
            <input type="number" id="temp2" placeholder="Temperatura inicial de la segunda sustancia" required>
            
            <label for="specific-heat-mix">Calor Específico (kcal/kg·°C):</label>
            <input type="number" id="specific-heat-mix" placeholder="Calor específico en kcal/kg·°C" value="1" required>
        `;
    }
    
    // Mostrar el botón de calcular cuando se selecciona una fórmula
    if (formula) {
        calculateButton.style.display = 'block';
    }
}

function calculate() {
    const formula = document.getElementById('formula').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Limpiar resultado previo

    if (formula === 'calor') {
        const mass = parseFloat(document.getElementById('mass').value);
        const initialTemp = parseFloat(document.getElementById('initial-temp').value);
        const finalTemp = parseFloat(document.getElementById('final-temp').value);
        const specificHeatWater = parseFloat(document.getElementById('specific-heat').value);
        const latentHeatFusion = parseFloat(document.getElementById('latent-heat-fusion').value);
        const specificHeatIce = parseFloat(document.getElementById('specific-heat-ice').value);
        
        let totalHeat = 0;
        let Q1 = 0, Q2 = 0, Q3 = 0;

        if (initialTemp > 0) {
            Q1 = mass * specificHeatWater * (0 - initialTemp); // Q1 = m * Ce * ΔT (enfriar agua a 0°C)
        }
        
        Q2 = mass * latentHeatFusion; // Q2 = m * Lf (fusión del hielo)

        if (finalTemp < 0) {
            Q3 = mass * specificHeatIce * (finalTemp - 0); // Q3 = m * Ce(hielo) * ΔT (enfriar hielo)
        } else if (finalTemp > 0) {
            Q3 = mass * specificHeatWater * (finalTemp - 0); // Q3 = m * Ce * ΔT (calentar agua)
        }

        totalHeat = Math.abs(Q1) + Q2 + Math.abs(Q3);
        resultDiv.innerHTML = `La cantidad de calor a extraer es de ${totalHeat.toFixed(2)} Kcal.`;
    } 
    else if (formula === 'cinematica') {
        const initialVelocity = parseFloat(document.getElementById('initial-velocity').value);
        const acceleration = parseFloat(document.getElementById('acceleration-cinematica').value);
        const time = parseFloat(document.getElementById('time-cinematica').value);

        const finalVelocity = initialVelocity + acceleration * time; // v = v0 + at
        const distance = initialVelocity * time + 0.5 * acceleration * time * time; // d = v0t + 0.5at²

        resultDiv.innerHTML = `La velocidad final es de ${finalVelocity.toFixed(2)} m/s y la distancia recorrida es de ${distance.toFixed(2)} m.`;
    } 
    else if (formula === 'dinamica') {
        const mass = parseFloat(document.getElementById('mass-dinamic').value);
        const acceleration = parseFloat(document.getElementById('acceleration').value);

        const force = mass * acceleration; // F = m * a
        resultDiv.innerHTML = `La fuerza es de ${force.toFixed(2)} N.`;
    } 
    else if (formula === 'energia') {
        const mass = parseFloat(document.getElementById('mass-energia').value);
        const velocity = parseFloat(document.getElementById('velocity-energia').value);

        const kineticEnergy = 0.5 * mass * velocity * velocity; // Ec = 0.5 * m * v²
        resultDiv.innerHTML = `La energía cinética es de ${kineticEnergy.toFixed(2)} J.`;
    } 
    else if (formula === 'mezcla') {
        const mass1 = parseFloat(document.getElementById('mass1').value);
        const temp1 = parseFloat(document.getElementById('temp1').value);
        const mass2 = parseFloat(document.getElementById('mass2').value);
        const temp2 = parseFloat(document.getElementById('temp2').value);
        const specificHeatMix = parseFloat(document.getElementById('specific-heat-mix').value);
        
        const finalTempMix = (mass1 * specificHeatMix * temp1 + mass2 * specificHeatMix * temp2) / 
                             (mass1 * specificHeatMix + mass2 * specificHeatMix); // Tf calculada
        
        resultDiv.innerHTML = `La temperatura final de la mezcla es de ${finalTempMix.toFixed(2)} °C.`;
    }
}